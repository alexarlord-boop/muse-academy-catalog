import {useEffect, useContext, useState, useLayoutEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {supabase} from '../lib/helper/supabaseClient.js';
import {SessionContext} from '../context/SessionContext.jsx';
import useAlbumStore from "./useAlbumsStore.js";


const useCatalog = (fetchFavoritesOnly = false, fetchPublishedOnly = false) => {
    const {session} = useContext(SessionContext);
    const navigate = useNavigate();
    const location = useLocation();



    const {
        loading,
        setLoading,
        albumsNumber,
        albumsPerPage,
        filteredAlbums,
        searchTerm,
        genre,
        format,
        setAlbumsNumber,
        setFilteredAlbums,
        setSearchTerm,
        setGenre,
        setFormat,
    } = useAlbumStore();

    useLayoutEffect(() => {

        const query = new URLSearchParams(location.search);
        const search = query.get('search') || '';
        const page = parseInt(query.get('page'), 10) || 1;
        const genreParam = query.get('genre') || '';
        const formatParam = query.get('format') || '';

        setSearchTerm(search);
        setGenre(genreParam);
        setFormat(formatParam);

        if (session?.user) {
            setLoading(true);
            if (fetchFavoritesOnly) {
                fetchFavorites(search, page, genreParam, formatParam);
            } else {
                fetchAll(search, page, genreParam, formatParam);
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
    }, [location.search, fetchFavoritesOnly, session?.user, albumsNumber]);

    const fetchFavorites = async (search, page, genre, format) => {
        const offset = (page - 1) * albumsPerPage;

        const userId = session.user.id;
        let {data: favoriteData, count, error: favError} = await supabase
            .from('favorites')
            .select(`
            album:album_id (id, name, art_creator, image_url, issue_date, genre1, format, is_public)
        `, {count: 'exact'})
            .eq('user_id', userId)
            .eq('album.is_public', true)
            .range(offset, offset + albumsPerPage - 1);

        if (favError) {
            console.error(favError);
            return;
        }

        let filteredData = favoriteData?.map(favorite =>
            favorite.album ? {
                ...favorite.album,
                isLiked: true  // Mark these albums as liked
            } : null).filter(album => album !== null);

        if (filteredData.length === 0) {
            updateURL(search, genre, format, 1);
        }

        setFilteredAlbums(filteredData);
        setAlbumsNumber(count);
    };

    const fetchAll = async (search, page, genre, format) => {
        const offset = (page - 1) * albumsPerPage;
        const userId = session.user.id;

        let query = supabase
            .from('album')
            .select('*', {count: 'exact'})
            .eq('is_public', fetchPublishedOnly)
            .order('id', {ascending: true})
            .range(offset, offset + albumsPerPage - 1);

        if (search) {
            query = query.or(`name.ilike.%${search}%,art_creator.ilike.%${search}%`);
        }

        if (genre) {
            query = query.eq('genre1', genre);
        }

        if (format) {
            query = query.eq('format', format);
        }

        let {data: albumsData, count, error: albumError} = await query;

        if (albumError) {
            console.error(albumError);
            return;
        }

        let {data: favoriteAlbums, error: favError} = await supabase
            .from('favorites')
            .select('album_id')
            .eq('user_id', userId);

        if (favError) {
            console.error(favError);
            return;
        }

        const favoriteAlbumIds = favoriteAlbums.map(fav => fav.album_id);

        const enrichedAlbums = albumsData.map(album => ({
            ...album,
            isLiked: favoriteAlbumIds.includes(album.id),
        }));

        setFilteredAlbums(enrichedAlbums);
        setAlbumsNumber(count);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (page) => {
        updateURL(searchTerm, genre, format, page);
    };

    const updateURL = (search, genre, format, page) => {
        const query = new URLSearchParams();
        if (search) query.set('search', search);
        if (genre) query.set('genre', genre);
        if (format) query.set('format', format);
        if (page) query.set('page', page);

        navigate(`?${query.toString()}`);
    };

    return {
        loading,
        albumsNumber,
        searchTerm,
        filteredAlbums,
        genre,
        format,
        handleSearchChange,
        handlePageChange,
        updateURL,
    };
};

export default useCatalog;
