import React, {useState, useEffect} from 'react';
import {
    Input,
    Pagination,
} from '@nextui-org/react';
import {useNavigate} from 'react-router-dom';
import {supabase} from "../lib/helper/supabaseClient.js";
import AlbumCard from "../components/AlbumCard.jsx";
import FilterModal from "../components/FilterModal.jsx";
import {FaFilter} from "react-icons/fa6";

const CatalogPage = () => {
    const [albums, setAlbums] = useState([]);
    const [albumsNumber, setAlbumsNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage] = useState(10); // Number of albums per page
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [genre, setGenre] = useState('');
    const [format, setFormat] = useState('');
    const [yearRange, setYearRange] = useState([1900, new Date().getFullYear()]);

    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm === '' && !genre && !format && yearRange[0] === 1900 && yearRange[1] === new Date().getFullYear()) {
            fetchAlbums(currentPage, albumsPerPage);
        } else {
            handleSearch();
        }
    }, [currentPage, searchTerm, genre, format, yearRange]);

    const fetchAlbums = (page, albumsPerPage) => {
        const offset = (page - 1) * albumsPerPage;

        supabase
            .from('album')
            .select('*')
            .order('id', {ascending: true})
            .range(offset, offset + albumsPerPage - 1)
            .then(({data, error}) => {
                if (error) {
                    throw error;
                }
                setAlbums(data);
                setFilteredAlbums(data);
            });

        supabase
            .from('album')
            .select('*', {count: 'exact', head: true})
            .then(({count, error}) => {
                if (error) {
                    throw error;
                }
                setAlbumsNumber(count);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search term
    };

    const handleSearch = () => {
        const offset = (currentPage - 1) * albumsPerPage;

        let query = supabase
            .from('album')
            .select('*')
            .order('id', {ascending: true})
            .range(offset, offset + albumsPerPage - 1);

        if (searchTerm) {
            query = query.or(`name.ilike.%${searchTerm}%,art_creator.ilike.%${searchTerm}%`);
        }
        // if (genre) {
        //     query = query.eq('genre', genre.toUpperCase());
        // }
        // if (format) {
        //     query = query.eq('format', format.toUpperCase());
        // }


        query.then(({data, error}) => {
            if (error) {
                throw error;
            }
            setFilteredAlbums(data);
        });

        let countQuery = supabase
            .from('album')
            .select('*', {count: 'exact', head: true});

        if (searchTerm) {
            countQuery = countQuery.or(`name.ilike.%${searchTerm}%,art_creator.ilike.%${searchTerm}%`);
        }
        if (genre) {
            countQuery = countQuery.eq('genre', genre);
        }
        if (format) {
            countQuery = countQuery.eq('format', format);
        }
        countQuery = countQuery.gte('year', yearRange[0]).lte('year', yearRange[1]);

        countQuery.then(({count, error}) => {
            if (error) {
                throw error;
            }
            setAlbumsNumber(count);
        })
            .catch((error) => {
                console.error(error);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAlbumClick = (albumId) => {
        navigate(`/albums/${albumId}`);
    };

    const handleEditClick = (e, albumId) => {
        e.stopPropagation();
        navigate(`/albums/edit/${albumId}`);
    };

    const handleDeleteClick = async (e, albumId) => {
        e.stopPropagation();
        const {error} = await supabase.from('albums').delete().eq('id', albumId);
        if (error) {
            console.error(error);
        } else {
            fetchAlbums(currentPage, albumsPerPage);
        }
    };

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleYearRangeChange = (value) => {
        setYearRange(value);
    };

    return (
        <div className="">
            <div className="flex z-20 justify-around w-full my-4">
                <Input
                    isClearable={true}
                    onClear={() => setSearchTerm('')}
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
                    yearRange={yearRange}
                    setYearRange={setYearRange}
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
                        initialPage={1}
                        onChange={handlePageChange}
                    />
                )}
            </div>
            <div className="albums-container">
                {filteredAlbums.length > 0 ? (
                    <div className="gap-2 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                        {filteredAlbums.map((album) => (
                            <AlbumCard album={album} key={album.id}/>
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
