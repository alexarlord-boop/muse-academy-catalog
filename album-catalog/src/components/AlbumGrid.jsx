import React from "react";
import AlbumCard from "./AlbumCard";
import useModalStore from "../hooks/useStore.js";
import { useDeleteRecord } from "../hooks/useDeleteRecord.js";
import {deleteModalStrings} from "../strings.js";

export default function AlbumGrid({ filteredAlbums, setFilteredAlbums }) {


    const { deleteRecord, deleteLoading, deleteError } = useDeleteRecord();
    const { openModal, setModalContent, updateOperation } = useModalStore();


    const handleDelete = async (albumId) => {
        await deleteRecord('album', 'id', albumId, '/catalog');
        const newAlbums = filteredAlbums.filter((a) => a.id !== albumId);
        setFilteredAlbums(newAlbums);
    };



    const handleOpenModal = (forAlbumId) => {
        setModalContent(deleteModalStrings);
        updateOperation(() => handleDelete(forAlbumId));
        openModal();
    };

    return (
        <>
            <div className="mt-3 gap-2 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                {filteredAlbums.length > 0 ? (
                    filteredAlbums.map((album) => (
                        <AlbumCard
                            album={album}
                            handleDeleteClick={() => handleOpenModal(album.id)} // Pass the album to the delete handler
                            key={album.id}
                        />
                    ))
                ) : (
                    <p>No albums found</p>
                )}
            </div>

        </>
    );
}
