import React, { useState, useEffect, useContext } from 'react';
import { Input, Pagination } from '@nextui-org/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from "../lib/helper/supabaseClient.js";
import AlbumCard from "../components/AlbumCard.jsx";
import FilterModal from "../components/FilterModal.jsx";
import AddAlbumCard from "../components/AddAlbumCard.jsx";
import toast from 'react-hot-toast';
import { SessionContext } from "../context/SessionContext.jsx";

const CatalogPage = () => {
    const [albums, setAlbums] = useState([]);
    const [albumsNumber, setAlbumsNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { session, role } = useContext(SessionContext);
    const [albumsPerPage, setAlbumsPerPage] = useState(10);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [genre, setGenre] = useState('');
    const [format, setFormat] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const notify = (msg) => toast(msg);

    // TODO:- sometimes doesn't work -- session storage?
    useEffect(() => {
        setAlbumsPerPage(role === "REDACTOR" ? 9 : 10);
    }, [role]);

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

        handleSearch(search, page, genreParam, formatParam);
    }, [location.search, albumsPerPage]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
        updateURL(e.target.value, genre, format, 1);
    };

    const handleSearch = (search, page, genre, format) => {
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

        query.then(({ data, count, error }) => {
            if (error) {
                console.error(error);
                return;
            }
            setFilteredAlbums(data);
            setAlbumsNumber(count);
        }).catch((error) => {
            console.error(error);
        });
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

    const onCardDeleted = (deletedAlbum) => {
        const newAlbums = filteredAlbums.filter((album) => album !== deletedAlbum);
        setFilteredAlbums(newAlbums);
        notify("Album deleted successfully");
    };

    const addSampleAlbum = async () => {
        try {
            var sampleAlbum = {
                created_at: new Date().toISOString(),
                name: 'Sample Album',
                art_creator: 'Sample Artist',
                issue_date: '2024-01-10',
                track_number: 12,
                image_url: '',
                creation_info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
                concept_info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
                facts_info: [],
                genre1: 'POP',
                format: 'CD'
            };
            const { data, error } = await supabase
                .from('album')
                .insert([sampleAlbum])
                .select();

            if (error) throw error;

            navigate('/catalog/edit/' + data[0].id);
            handleSearch(searchTerm, currentPage, genre, format);
        } catch (error) {
            console.error('Error adding sample album:', error);
            notify('Failed to add sample album');
        }
    };

    return (
        <div>
            <div className="flex z-20 justify-around w-full my-4">
                <Input
                    isClearable={true}
                    onClear={() => updateURL('', genre, format, 1)}
                    size="sm"
                    radius="lg"
                    onChange={handleSearchChange}
                    value={searchTerm}
                    classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "w-1/3",
                            "shadow-md",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focus=true]:bg-default-200/50",
                            "dark:group-data-[focus=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    }}
                    placeholder="Type to search..."
                />

                <FilterModal
                    genre={genre}
                    setGenre={setGenre}
                    format={format}
                    setFormat={setFormat}
                    onApplyFilters={(genre, format) => updateURL(searchTerm, genre, format, 1)}
                    onClearFilters={(genre, format) => updateURL(searchTerm, null, null, 1)}
                />

                {filteredAlbums.length > 0 && (
                    <Pagination
                        size="sm"
                        isCompact
                        className="absolute"
                        loop
                        showControls={Math.ceil(albumsNumber / albumsPerPage) > 1}
                        showShadow={true}
                        total={Math.ceil(albumsNumber / albumsPerPage)}
                        initialPage={currentPage}
                        onChange={handlePageChange}
                    />
                )}
            </div>

            <div className="albums-container">
                <div className="gap-2 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                    {session?.user && role === "REDACTOR" ?
                        <AddAlbumCard onAddSampleAlbum={addSampleAlbum}/>
                        : <></>
                    }

                    {filteredAlbums.length > 0 ? (
                        filteredAlbums.map((album) => (
                            <AlbumCard album={album} onCardDeleted={onCardDeleted} key={album.id}/>
                        ))
                    ) : (
                        <p>No albums found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
