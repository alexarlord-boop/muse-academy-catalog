import React from 'react';
import AlbumGrid from '../components/AlbumGrid.jsx';
import useCatalog from "../hooks/useCatalog.js";
import CatalogPagination from "../components/CatalogPagination.jsx";
import Loader from "../components/Loader.jsx";

const FavoritesPage = (
    {
        loading,
    }
) => {
    return (
        <>
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

export default FavoritesPage;
