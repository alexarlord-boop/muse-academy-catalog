import React from 'react';
import CatalogPagination from '../components/CatalogPagination.jsx';
import AlbumGrid from '../components/AlbumGrid.jsx';
import useSampleAlbum from '../hooks/useSampleAlbum.js';
import useCatalog from "../hooks/useCatalog.js";

const CatalogPage = () => {
    const {
        handleSearchChange,
        searchTerm,
        setSearchTerm,
        updateURL,
        genre,
        setGenre,
        format,
        setFormat,
        albumsNumber,
        currentPage,
        albumsPerPage,
        filteredAlbums,
        setFilteredAlbums,
        handlePageChange,
        session,
        role
    } = useCatalog();

    const { addSampleAlbum } = useSampleAlbum();

    return (
        <>
            {/*TODO:- add deletion modal window for confirmation*/}
            {/*TODO:- fix car name spacing, font sizes (desk/mobile)*/}
            {/*TODO:- more filter options (year)*/}
            <AlbumGrid
                session={session}
                role={role}
                filteredAlbums={filteredAlbums}
                setFilteredAlbums={setFilteredAlbums}
                addSampleAlbum={addSampleAlbum}
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
