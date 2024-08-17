import React, {useEffect, useLayoutEffect} from "react";
import AlbumCard from "./AlbumCard";
import useModalStore from "../hooks/useStore.js";
import { useDeleteRecord } from "../hooks/useDeleteRecord.js";
import {deleteModalStrings} from "../strings.js";
import {useLocation, useNavigate} from "react-router-dom";

export default function AlbumGrid({ filteredAlbums, setFilteredAlbums }) {


    const { deleteRecord, deleteLoading, deleteError } = useDeleteRecord();
    const { openModal, setModalContent, updateOperation } = useModalStore();
    const navigate = useNavigate();
    const location = useLocation();


    const handleDelete = async (albumId) => {
        const newAlbums = filteredAlbums.filter((a) => a.id !== albumId);

        await deleteRecord('album', 'id', albumId, newAlbums.length === 0 ? "/catalog/?page=1" : null);

        setFilteredAlbums(newAlbums);
    };



    const handleOpenModal = (forAlbumId) => {
        setModalContent(deleteModalStrings);
        updateOperation(() => handleDelete(forAlbumId));
        openModal();
    };



    return (
        <div className="container flex items-center justify-center h-full">
            <div className="mt-3 gap-2 grid  lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                {filteredAlbums.length > 0 ? (
                    filteredAlbums.map((album) => (
                        <AlbumCard
                            album={album}
                            handleDeleteClick={() => handleOpenModal(album.id)} // Pass the album to the delete handler
                            key={album.id}
                            variant={location.pathname.includes("/catalog") ? "catalog" : "favorites"}
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
