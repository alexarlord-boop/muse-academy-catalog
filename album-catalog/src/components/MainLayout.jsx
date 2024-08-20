import React from "react";
import NavBar from "./NavBar";
import CustomToast from "./CustomToast.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import useCatalog from "../hooks/useCatalog.js";

const MainLayout = ({children}) => {

    const {
        albumsNumber,
        searchTerm,
        albumsPerPage,
        filteredAlbums,
        setFilteredAlbums,
        genre,
        format,
        setGenre,
        setFormat,
        handleSearchChange,
        handlePageChange,
        updateURL,
    } = useCatalog(location.pathname === "/favourites", location.pathname !== "/unpublished");
    return (
        <div>
            {/*TODO:- add loader*/}
            <NavBar
                handleSearchChange={handleSearchChange}
                searchTerm={searchTerm}
                updateURL={updateURL}
                genre={genre}
                setGenre={setGenre}
                format={format}
                setFormat={setFormat}
            />
            <main className="container mx-auto px-5">
                {
                    React.cloneElement(children, {
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
        </div>
    );
};

export default MainLayout;