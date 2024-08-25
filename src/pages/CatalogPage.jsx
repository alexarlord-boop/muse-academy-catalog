import React from 'react';
import CatalogPagination from '../components/CatalogPagination.jsx';
import AlbumGrid from '../components/AlbumGrid.jsx';
import Loader from "../components/Loader.jsx";

const CatalogPage = (
    {
        loading,
    }
) => {
    return (
        <>
            {/*TODO:- more filter options (year)*/}

            {!loading ? (
                   <>
                       <AlbumGrid/>
                       <CatalogPagination/>
                   </>
                ) :
                (
                   <Loader/>
                )

            }

        </>
    );
};

export default CatalogPage;
