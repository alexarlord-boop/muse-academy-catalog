import React from 'react';
import AlbumGrid from "../components/AlbumGrid.jsx";
import CatalogPagination from "../components/CatalogPagination.jsx";
import CustomSpinner from "../components/Spinner.jsx";

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
                    <CustomSpinner/>
                )

            }
        </>
    );
};

export default UnpublishedPage;