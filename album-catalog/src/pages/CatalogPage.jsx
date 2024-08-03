import React from 'react';
import CatalogToolbar from '../components/CatalogToolbar.jsx';
import CatalogPagination from '../components/CatalogPagination.jsx';
import AlbumGrid from '../components/AlbumGrid.jsx';
import useSampleAlbum from '../hooks/useSampleAlbum.js';
import useCatalog from "../hooks/useCatalog.js";

const CatalogPage = () => {
    const {
        albumsNumber,
        searchTerm,
        currentPage,
        albumsPerPage,
        filteredAlbums,
        setFilteredAlbums,
        genre,
        format,
        setSearchTerm,
        setGenre,
        setFormat,
        handleSearchChange,
        handlePageChange,
        updateURL,
        session,
        role
    } = useCatalog();

    const { addSampleAlbum } = useSampleAlbum();

    return (
        <>
            <CatalogToolbar
                onSearchChange={handleSearchChange}
                searchTerm={searchTerm}
                updateURL={updateURL}
                genre={genre}
                setGenre={setGenre}
                format={format}
                setFormat={setFormat}
            />

            <AlbumGrid
                session={session}
                role={role}
                filteredAlbums={filteredAlbums}
                setFilteredAlbums={setFilteredAlbums}
                addSampleAlbum={addSampleAlbum}
            />

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
