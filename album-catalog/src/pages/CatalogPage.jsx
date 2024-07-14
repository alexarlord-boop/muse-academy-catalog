// src/pages/CatalogPage.jsx

import React, {useState, useEffect} from 'react';
import {Input, Pagination} from '@nextui-org/react';
import {useNavigate} from 'react-router-dom';
import {supabase} from "../lib/helper/supabaseClient.js";
import {HeartIcon} from "../components/icons/HeartIcon.jsx";
import AlbumCard from "../components/AlbumCard.jsx";


const CatalogPage = () => {
    const [albums, setAlbums] = useState([]);
    const [albumsNumber, setAlbumsNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage] = useState(10); // Number of albums per page
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlbums(currentPage, albumsPerPage);
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, albums]);

    const fetchAlbums = (page, albumsPerPage) => {
        const offset = (page - 1) * albumsPerPage;

        const albumsPromise = supabase
            .from('album')
            .select('*')
            .order('id', {ascending: true})
            .range(offset, offset + albumsPerPage - 1);

        const albumCountPromise = supabase
            .from('album')
            .select('*', {count: 'exact', head: true});

        albumsPromise
            .then(({data, error: albumsError}) => {
                if (albumsError) {
                    throw albumsError;
                }
                return data;
            })
            .then((data) => {
                setAlbums(data);
                setFilteredAlbums(data);
                console.log(data);

                // After setting albums, fetch count
                return albumCountPromise;
            })
            .then(({count, error: countError}) => {
                if (countError) {
                    throw countError;
                }
                setAlbumsNumber(count);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm !== '') {


            const albumsBySearchTerm = supabase
                .from('album')
                .select('*')
                .or(`or(name.ilike.%${searchTerm}%),or(art_creator.ilike.%${searchTerm}%)`);

            console.log(searchTerm);

            albumsBySearchTerm
                .then(({data, error: albumsError}) => {
                    console.log(data);
                    if (albumsError) {
                        throw albumsError;
                    }
                    setFilteredAlbums(data);
                    setCurrentPage(1);
                })

                .catch((error) => {
                    console.error(error);
                })

        }

    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchAlbums(page, albumsPerPage);
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
            fetchAlbums();
        }
    };

    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

    return (
        <div className="">
            <div className="flex  z-20 justify-around  w-full my-4">
                <Input
                    isClearable={true}
                    onClear={() => {
                        setSearchTerm('')
                    }}
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
                    // startContent={
                    //     <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    // }
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

                <div>Filter</div>

            </div>
            <div className="albums-container">
                {albumsNumber > 0 ? (
                    <div className="gap-2 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                        {currentAlbums.map((album) => (
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
