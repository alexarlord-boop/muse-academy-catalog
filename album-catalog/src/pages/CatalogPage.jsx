import React from 'react';
import CatalogPagination from '../components/CatalogPagination.jsx';
import AlbumGrid from '../components/AlbumGrid.jsx';

const CatalogPage = (
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
            {/*TODO:- more filter options (year)*/}
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

export default CatalogPage;
