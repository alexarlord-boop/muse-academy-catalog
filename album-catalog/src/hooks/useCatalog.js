import {useState, useEffect, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {supabase} from '../lib/helper/supabaseClient.js';
import {SessionContext} from '../context/SessionContext.jsx';

const useCatalog = (fetchFavoritesOnly = false) => {
    const [albumsNumber, setAlbumsNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const {session} = useContext(SessionContext);
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
            console.log(albumsNumber);
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
            updateURL(search, 1, genre, format);
        }

        setFilteredAlbums(filteredData);
        setAlbumsNumber(count);
    };

    const fetchAll = async (search, page, genre, format) => {
        const offset = (page - 1) * albumsPerPage;
        const userId = session.user.id;

        // Fetch all albums
        let {data: albumsData, count, error: albumError} = await supabase
            .from('album')
            .select('*', {count: 'exact'})
            .order('id', {ascending: true})
            .range(offset, offset + albumsPerPage - 1);

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
        let enrichedAlbums = albumsData.map(album => ({
            ...album,
            isLiked: favoriteAlbumIds.includes(album.id) // Check if the album is in the favorite list
        }));

        // Filter by search, genre, and format
        if (search) {
            enrichedAlbums = enrichedAlbums.filter(album =>
                album.name.toLowerCase().includes(search.toLowerCase()) ||
                album.art_creator.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (genre) {
            enrichedAlbums = enrichedAlbums.filter(album => album.genre1 === genre);
        }

        if (format) {
            enrichedAlbums = enrichedAlbums.filter(album => album.format === format);
        }

        setFilteredAlbums(enrichedAlbums);
        setAlbumsNumber(count);
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
