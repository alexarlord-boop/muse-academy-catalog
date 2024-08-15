import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/helper/supabaseClient.js';
import { SessionContext } from '../context/SessionContext.jsx';

const useCatalog = (fetchFavoritesOnly = false) => {
    const [albumsNumber, setAlbumsNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { session } = useContext(SessionContext);
    const [albumsPerPage, setAlbumsPerPage] = useState(10);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [genre, setGenre] = useState('');
    const [format, setFormat] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const search = query.get('search') || '';
        const page = parseInt(query.get('page'), 10) || 1;
        const genreParam = query.get('genre') || '';
        const formatParam = query.get('format') || '';

        setCurrentPage(page);
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
    }, [location.search, fetchFavoritesOnly, session?.user]);

    const fetchFavorites = async (search, page, genre, format) => {
        const offset = (page - 1) * albumsPerPage;

        const userId = session.user.id;
        let { data, error } = await supabase
            .from('favorites')
            .select(`
            album:album_id (id, name, art_creator, image_url, issue_date, genre1, format)
        `)
            .eq('user_id', userId)
            .range(offset, offset + albumsPerPage - 1);


        if (error) {
            console.error(error);
            return;
        }

        let filteredData = data.map(favorite => favorite.album);

        // TODO:- not in a task context
        // if (search) {
        //     const lowerSearch = search.toLowerCase();
        //     filteredData = filteredData.filter(album =>
        //         album.name.toLowerCase().includes(lowerSearch) ||
        //         album.art_creator.toLowerCase().includes(lowerSearch)
        //     );
        // }
        //
        // if (genre) {
        //     filteredData = filteredData.filter(album => album.genre1 === genre);
        // }
        //
        // if (format) {
        //     filteredData = filteredData.filter(album => album.format === format);
        // }

        setFilteredAlbums(filteredData);
        setAlbumsNumber(filteredData.length);
    };

    const fetchAll = (search, page, genre, format) => {
        const offset = (page - 1) * albumsPerPage;

        let query = supabase
            .from('album')
            .select('*', { count: 'exact' })
            .order('id', { ascending: true })
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

        query
            .then(({ data, count, error }) => {
                if (error) {
                    console.error(error);
                    return;
                }
                setFilteredAlbums(data);
                setAlbumsNumber(count);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
        currentPage,
        setCurrentPage,
        albumsPerPage,
        filteredAlbums,
        setFilteredAlbums,
        genre,
        format,
        setSearchTerm,
        setGenre,
        setFormat,
        handleSearchChange,
        fetchAll,
        handlePageChange,
        updateURL,
        session
    };
};

export default useCatalog;
