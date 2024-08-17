import React from 'react';
import AlbumGrid from '../components/AlbumGrid.jsx';
import useCatalog from "../hooks/useCatalog.js";
import CatalogPagination from "../components/CatalogPagination.jsx";

const FavouritesPage = (
    {
        filteredAlbums,
        setFilteredAlbums,
        albumsNumber,
        albumsPerPage,
        handlePageChange,
    }
) => {
    return (
        <>
            <AlbumGrid
                filteredAlbums={filteredAlbums}
                setFilteredAlbums={setFilteredAlbums}
            />

            <CatalogPagination
                albumsNumber={albumsNumber}
                albumsPerPage={albumsPerPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default FavouritesPage;
