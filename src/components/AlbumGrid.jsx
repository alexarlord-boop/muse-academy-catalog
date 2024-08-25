import React from "react";
import AlbumCard from "./AlbumCardComponents/AlbumCard.jsx";
import {useLocation, } from "react-router-dom";
import useAlbumStore from "../hooks/useAlbumsStore.js";

export default function AlbumGrid() {
    const location = useLocation();
    const {filteredAlbums} = useAlbumStore();

    return (
        <div className="container flex items-center justify-center h-full">
            <div className="mt-3 gap-4 grid  lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                {filteredAlbums?.length > 0 && (
                    filteredAlbums.map((album) => (
                        <AlbumCard
                            album={album}
                            key={album.id}
                            variant={location.pathname.includes("/catalog") ? "catalog" : "favorites"}
                            isPublic={!location.pathname.includes("/unpublished")}
                        />
                    ))
                )}
            </div>

        </div>
    );
}
