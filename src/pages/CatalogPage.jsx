import React from 'react';
import CatalogPagination from '../components/CatalogPagination.jsx';
import AlbumGrid from '../components/AlbumGrid.jsx';
import {Spinner} from "@nextui-org/react";
import CustomSpinner from "../components/Spinner.jsx";

const CatalogPage = (
    {
        loading,
        albumsNumber,
        albumsPerPage,
        handlePageChange,
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
                   <CustomSpinner/>
                )

            }

        </>
    );
};

export default CatalogPage;
