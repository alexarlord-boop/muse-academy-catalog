import React, {useEffect, useLayoutEffect} from "react";
import AlbumCard from "./AlbumCardComponents/AlbumCard.jsx";
import useModalStore from "../hooks/useStore.js";
import { useDeleteRecord } from "../hooks/useDeleteRecord.js";
import {deleteModalStrings} from "../strings.js";
import {useLocation, useNavigate} from "react-router-dom";

export default function AlbumGrid({ filteredAlbums, setFilteredAlbums }) {


    const navigate = useNavigate();
    const location = useLocation();







    return (
        <div className="container flex items-center justify-center h-full">
            <div className="mt-3 gap-4 grid  lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                {filteredAlbums.length > 0 ? (
                    filteredAlbums.map((album) => (
                        <AlbumCard
                            album={album}
                            key={album.id}
                            variant={location.pathname.includes("/catalog") ? "catalog" : "favorites"}
                            isPublic={!location.pathname.includes("/unpublished")}
                        />
                    ))
                ) :
                    (
                    <p>No albums found</p>
                )}
            </div>

        </div>
    );
}
