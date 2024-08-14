import React from 'react';
import CatalogPagination from '../components/CatalogPagination.jsx';
import AlbumGrid from '../components/AlbumGrid.jsx';
import useCatalog from "../hooks/useCatalog.js";

const CatalogPage = () => {
    const {
        filteredAlbums,
        setFilteredAlbums,
        albumsNumber,
        albumsPerPage,
        currentPage,
        handlePageChange,
    } = useCatalog();


    return (
        <>
            {/*TODO:- fix card name spacing, font sizes (desk/mobile)*/}
            {/*TODO:- more filter options (year)*/}
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

export default CatalogPage;
