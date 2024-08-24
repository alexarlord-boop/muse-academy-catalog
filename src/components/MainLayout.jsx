import React, {useContext, useEffect} from "react";
import NavBar from "./NavBar";
import CustomToast from "./CustomToast.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import useCatalog from "../hooks/useCatalog.js";
import useAlbumStore from "../hooks/useAlbumsStore.js";
import {SessionContext} from "../context/SessionContext.jsx";
import {supabase} from "../lib/helper/supabaseClient.js";

const MainLayout = ({children}) => {
    const {session} = useContext(SessionContext);

    const fetchFavOnly = location.pathname === "/favorites";
    const fetchPublicOnly = location.pathname !== "/unpublished";

    const {
        loading,
        albumsNumber,
        setAlbumsNumber,
        albumsPerPage,
        filteredAlbums,
        searchTerm,
        genre,
        format,
        setFilteredAlbums,
        setGenre,
        setFormat,
    } = useAlbumStore();

    const {
        handleSearchChange,
        handlePageChange,
        updateURL,
    } = useCatalog(fetchFavOnly, fetchPublicOnly);

    useEffect(() => {
        if (fetchFavOnly) {
            const userId = session?.user.id;
            let {data: favoriteData, count, error: favError} =  supabase
                .from('favorites')
                .select(`
            album:album_id (id, name, art_creator, image_url, issue_date, genre1, format, is_public)
        `, {count: 'exact'})
                .eq('user_id', userId)
                .eq('album.is_public', true);

            let filteredData = favoriteData?.map(favorite =>
                favorite.album ? {
                    ...favorite.album,
                    isLiked: true  // Mark these albums as liked
                } : null).filter(album => album !== null);

            setFilteredAlbums(filteredData);
            setAlbumsNumber(count);
        }
    }, [session]);


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
            <main className="container mx-auto px-5">
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
        </div>
    );
};

export default MainLayout;