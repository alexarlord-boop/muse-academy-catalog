import React from "react";
import NavBar from "./NavBar";
import CustomToast from "./CustomToast.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import useCatalog from "../hooks/useCatalog.js";
import useAlbumStore from "../hooks/useAlbumsStore.js";
import Footer from "./Footer.jsx";

const MainLayout = ({children}) => {

    const fetchFavOnly = location.pathname === "/favorites";
    const fetchPublicOnly = location.pathname !== "/unpublished";
    const {
        handleSearchChange,
        handlePageChange,
        updateURL,
    } = useCatalog(fetchFavOnly, fetchPublicOnly);

    const {
        loading,
        albumsNumber,
        albumsPerPage,
        filteredAlbums,
        searchTerm,
        genre,
        format,
        setFilteredAlbums,
        setGenre,
        setFormat,
    } = useAlbumStore();

    return (
        <div>
            <NavBar
                handleSearchChange={handleSearchChange}
                searchTerm={searchTerm}
                updateURL={updateURL}
                genre={genre}
                setGenre={setGenre}
                format={format}
                setFormat={setFormat}
            />
            <main className="container mx-auto px-4">
                {
                    React.cloneElement(children, {
                        loading,
                        filteredAlbums,
                        setFilteredAlbums,
                        albumsNumber,
                        albumsPerPage,
                        handlePageChange,
                    })
                }
            </main>
            <CustomToast/>
            <ConfirmationModal/> {/* deletion, publishing */}
            <Footer/>
        </div>
    );
};

export default MainLayout;