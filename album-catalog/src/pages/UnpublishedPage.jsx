import React from 'react';
import AlbumGrid from "../components/AlbumGrid.jsx";
import CatalogPagination from "../components/CatalogPagination.jsx";

const UnpublishedPage = (  {
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

export default UnpublishedPage;