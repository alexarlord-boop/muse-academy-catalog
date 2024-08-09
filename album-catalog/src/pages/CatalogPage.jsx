import React, {useEffect} from 'react';
import CatalogPagination from '../components/CatalogPagination.jsx';
import AlbumGrid from '../components/AlbumGrid.jsx';
import useCatalog from "../hooks/useCatalog.js";

const CatalogPage = () => {
    const {
        albumsNumber,
        currentPage,
        albumsPerPage,
        filteredAlbums,
        setFilteredAlbums,
        handlePageChange,

    } = useCatalog();


    // TODO:- make compound component for catalog, shared state via custom hook
    return (
        <>
            {/*TODO:- add deletion modal window for confirmation*/}
            {/*TODO:- fix car name spacing, font sizes (desk/mobile)*/}
            {/*TODO:- more filter options (year)*/}
            <AlbumGrid
                filteredAlbums={filteredAlbums}
                setFilteredAlbums={setFilteredAlbums}
            />

            {/*TODO:- pagination togle is bugged when search is changed*/}
            {/*TODO:- 2nd page, go to catalog init -- same togle*/}
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
