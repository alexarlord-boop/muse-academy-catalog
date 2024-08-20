import {useState, useEffect, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {supabase} from '../lib/helper/supabaseClient.js';
import {SessionContext} from '../context/SessionContext.jsx';

const useCatalog = (fetchFavoritesOnly = false, fetchPublishedOnly=false) => {
    const [albumsNumber, setAlbumsNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const {session} = useContext(SessionContext);
    const [albumsPerPage, setAlbumsPerPage] = useState(10);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [genre, setGenre] = useState('');
    const [format, setFormat] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("calling useCatalog: useEffect", location.search, fetchFavoritesOnly, session?.user, albumsNumber);
        const query = new URLSearchParams(location.search);
        const search = query.get('search') || '';
        const page = parseInt(query.get('page'), 10) || 1;
        const genreParam = query.get('genre') || '';
        const formatParam = query.get('format') || '';

        setSearchTerm(search);
        setGenre(genreParam);
        setFormat(formatParam);

        if (session?.user) {
            if (fetchFavoritesOnly) {
                fetchFavorites(search, page, genreParam, formatParam);
            } else {
                fetchAll(search, page, genreParam, formatParam);
            }

        }
    }, [location.search, fetchFavoritesOnly, session?.user, albumsNumber]);

    const fetchFavorites = async (search, page, genre, format) => {
        const offset = (page - 1) * albumsPerPage;

        const userId = session.user.id;
        let {data: favoriteData, count, error: favError} = await supabase
            .from('favorites')
            .select(`
            album:album_id (id, name, art_creator, image_url, issue_date, genre1, format)
        `, {count: 'exact'})
            .eq('user_id', userId)
            .range(offset, offset + albumsPerPage - 1);
        if (favError) {
            console.error(favError);
            return;
        }

        let filteredData = favoriteData.map(favorite => ({
            ...favorite.album,
            isLiked: true  // Mark these albums as liked
        }));

        if (filteredData.length === 0) {
            updateURL(search, genre, format, 1);
        }

        setFilteredAlbums(filteredData);
        setAlbumsNumber(count);
    };

    const fetchAll = async (search, page, genre, format) => {
        console.log('calling useCatalog: fetching all albums');
        const offset = (page - 1) * albumsPerPage;
        const userId = session.user.id;

        // Build the base query for albums
        let query = supabase
            .from('album')
            .select('*', {count: 'exact'})
            .eq('is_public', fetchPublishedOnly)
            .order('id', {ascending: true})
            .range(offset, offset + albumsPerPage - 1);

        // Apply search filter (if search is provided)
        if (search) {
            query = query.or(`name.ilike.%${search}%,art_creator.ilike.%${search}%`);
        }

        // Apply genre filter (if genre is provided)
        if (genre) {
            query = query.eq('genre1', genre);
        }

        // Apply format filter (if format is provided)
        if (format) {
            query = query.eq('format', format);
        }

        // Execute the query
        let {data: albumsData, count, error: albumError} = await query;

        if (albumError) {
            console.error(albumError);
            return;
        }

        // Fetch the user's favorites
        let {data: favoriteAlbums, error: favError} = await supabase
            .from('favorites')
            .select('album_id')
            .eq('user_id', userId);

        if (favError) {
            console.error(favError);
            return;
        }

        const favoriteAlbumIds = favoriteAlbums.map(fav => fav.album_id);

        // Map albums and add isLiked status
        const enrichedAlbums = albumsData.map(album => ({
            ...album,
            isLiked: favoriteAlbumIds.includes(album.id), // Check if the album is in the favorite list
        }));

        // Set the state with the fetched data
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
        albumsNumber,
        searchTerm,
        albumsPerPage,
        filteredAlbums,
        setFilteredAlbums,
        genre,
        format,
        setSearchTerm,
        setGenre,
        setFormat,
        handleSearchChange,
        handlePageChange,
        updateURL
    };
};

export default useCatalog;
