import React, { useState } from "react";
import AlbumCard from "./AlbumCard";
import toast from "react-hot-toast";
import useModalStore from "../hooks/useStore.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import { useDeleteRecord } from "../hooks/useDeleteRecord.js";
import {useNavigate} from "react-router-dom";

export default function AlbumGrid({ filteredAlbums, setFilteredAlbums }) {

    const { isModalOpen, openModal, closeModal } = useModalStore();
    const { deleteRecord, deleteLoading, deleteError } = useDeleteRecord();
    const { navigate, history } = useNavigate();

    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const handleDeleteClick = (album) => {
        setSelectedAlbum(album); // Store the selected album for deletion
        openModal(); // Open the confirmation modal
    };
    const handleDelete = async () => {
        if (selectedAlbum) {
            await deleteRecord('album', 'id', selectedAlbum.id, null);
            closeModal();
            // Filter out the deleted album from the album list
            const newAlbums = filteredAlbums.filter((album) => album.id !== selectedAlbum.id);
            setFilteredAlbums(newAlbums);
        }
    };

    return (
        <>
            <div className="mt-3 gap-2 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                {filteredAlbums.length > 0 ? (
                    filteredAlbums.map((album) => (
                        <AlbumCard
                            album={album}
                            handleDeleteClick={() => handleDeleteClick(album)} // Pass the album to the delete handler
                            key={album.id}
                        />
                    ))
                ) : (
                    <p>No albums found</p>
                )}
            </div>

            {selectedAlbum && (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleDelete}
                    title="Confirm Deletion"
                    confirmTitle="Delete"
                    description="Are you sure you want to delete this album? This action cannot be undone."
                    portalContainer={document.getElementById('modal')}
                />
            )}
        </>
    );
}
