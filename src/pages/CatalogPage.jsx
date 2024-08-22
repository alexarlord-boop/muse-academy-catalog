import React from 'react';
import CatalogPagination from '../components/CatalogPagination.jsx';
import AlbumGrid from '../components/AlbumGrid.jsx';

const CatalogPage = (
    {
        albumsNumber,
        albumsPerPage,
        handlePageChange,
    }
) => {
    return (
        <>
            {/*TODO:- more filter options (year)*/}
            <AlbumGrid/>
            <CatalogPagination/>
        </>
    );
};

export default CatalogPage;
