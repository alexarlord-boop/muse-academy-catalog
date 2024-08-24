import React from 'react';
import AlbumGrid from "../components/AlbumGrid.jsx";
import CatalogPagination from "../components/CatalogPagination.jsx";
import Loader from "../components/Loader.jsx";

const UnpublishedPage = (  {
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

export default UnpublishedPage;