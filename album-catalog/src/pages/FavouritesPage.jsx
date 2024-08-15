import React from 'react';
import AlbumGrid from '../components/AlbumGrid.jsx';
import useCatalog from "../hooks/useCatalog.js";
import CatalogPagination from "../components/CatalogPagination.jsx";

const FavouritesPage = () => {
    const {
        filteredAlbums,
        setFilteredAlbums,
        albumsNumber,
        albumsPerPage,
        currentPage,
        handlePageChange,
    } = useCatalog(true);  // Pass `true` to fetch favorites

    return (
        <>
            <AlbumGrid
                filteredAlbums={filteredAlbums}
                setFilteredAlbums={setFilteredAlbums}
            />

            <CatalogPagination
                albumsNumber={albumsNumber}
                albumsPerPage={albumsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default FavouritesPage;
