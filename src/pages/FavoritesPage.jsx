import React from 'react';
import AlbumGrid from '../components/AlbumGrid.jsx';
import useCatalog from "../hooks/useCatalog.js";
import CatalogPagination from "../components/CatalogPagination.jsx";

const FavoritesPage = (
    {
        albumsNumber,
        albumsPerPage,
        handlePageChange,
    }
) => {
    return (
        <>
            <AlbumGrid/>

            <CatalogPagination
                albumsNumber={albumsNumber}
                albumsPerPage={albumsPerPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default FavoritesPage;
