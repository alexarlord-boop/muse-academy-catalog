import React, { useState, useEffect } from 'react';
import { Input, Pagination } from '@nextui-org/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from "../lib/helper/supabaseClient.js";
import AlbumCard from "../components/AlbumCard.jsx";
import FilterModal from "../components/FilterModal.jsx";

const CatalogPage = () => {
    const [albums, setAlbums] = useState([]);
    const [albumsNumber, setAlbumsNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage] = useState(10); // Number of albums per page
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

        console.log(query.toString());

        handleSearch(search, page, genreParam, formatParam);

    }, [location.search]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search term
        updateURL(e.target.value, genre, format, 1);
    };


    const handleSearch = (search, page, genre, format) => {
        const offset = (page - 1) * albumsPerPage;

        let query = supabase
            .from('album')
            .select('*', { count: 'exact' }) // Combine data fetch and count
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

        console.log(query.toString());

        navigate(`?${query.toString()}`);
    };

    return (
        <div className="">
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
                            "shadow-xl",
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
                />

                {filteredAlbums.length > 0 && (
                    // TODO:- when using navbar 'Albums' -- page is not changed
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
                {filteredAlbums.length > 0 ? (
                    <div className="gap-2 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                        {filteredAlbums.map((album) => (
                            <AlbumCard album={album} key={album.id} />
                        ))}
                    </div>
                ) : (
                    <p>No albums found</p>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
