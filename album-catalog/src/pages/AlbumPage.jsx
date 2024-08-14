import React, {useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useAlbum from "../hooks/useAlbum.js";
import {Spacer} from "@nextui-org/react";
import {AssetIsAbsent} from "../components/icons/AssetIsAbsent.jsx";
import {Button} from "@nextui-org/button";
import {SessionContext} from "../context/SessionContext.jsx";
import {TbEdit, TbTrashX} from "react-icons/tb";
import useModalStore from "../hooks/useStore.js";
import {useDeleteRecord} from "../hooks/useDeleteRecord.js";

const AlbumPage = () => {
    const {id} = useParams();
    const {album, loading, error} = useAlbum(id);
    const navigate = useNavigate();
    const {session, role} = useContext(SessionContext);

    const { openModal, setModalContent, updateOperation } = useModalStore();

    const { deleteRecord, deleteLoading, deleteError } = useDeleteRecord();

    const handleDelete = async () => {
        await deleteRecord('album', 'id', album.id, '/catalog');
    };

    const handleOpenModal = () => {
        setModalContent({
            modalTitle: "Confirm Deletion",
            confirmTitle: "Delete",
            description: "Are you sure you want to delete this album? This action cannot be undone."
        });
        updateOperation(handleDelete);
        openModal();
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <>
            <div className="flex flex-wrap mx-auto p-6 bg-white">
                <div className="w-full md:w-1/2 max-h-full px-4">
                    <div className="text-6xl font-bold">{album.name}</div>
                    <Spacer y={3}/>
                    <p className="text-default-500 text-xl font-bold">{album.art_creator}</p>
                    <span>
                        <p className="inline text-default-400">{album.issue_date.split('-')[0]} ● </p>
                        <p className="inline text-default-400">{album.genre1}</p>
                    </span>
                    <Spacer y={10}/>
                    <p className="text-gray-700"><strong>Tracks:</strong> {album.track_number}</p>
                    <p className="text-gray-700"><strong>Format:</strong> {album.format}</p>
                    <Spacer y={10}/>
                    <div>
                        <h2 className="text-xl font-semibold">About the Album</h2>
                        <p className="text-gray-600 mt-2"><strong>Creation Info:</strong> {album.creation_info}</p>
                        <Spacer y={3}/>
                        <p className="text-gray-600"><strong>Concept Info:</strong> {album.concept_info}</p>
                        <Spacer y={5}/>
                    </div>

                    {session?.user && role === "REDACTOR" && (
                        <div className="flex flex-wrap">
                            <Button onClick={() => navigate('/catalog/edit/' + album.id)}
                                    className="mx-auto flex py-2"
                                    startContent={<TbEdit/>}
                            >Edit</Button>

                            <Button onClick={handleOpenModal}
                                    className="mx-auto flex py-2"
                                    color="danger"
                                    startContent={<TbTrashX/>}
                            >Delete</Button>
                        </div>
                    )}

                    <Spacer y={5}/>
                </div>

                <div className="w-full md:w-1/2 px-4 flex justify-center items-center">
                    {album.image_url ? (
                        <img
                            src={album.image_url}
                            alt={`${album.name} cover`}
                            className="object-cover rounded-xl shadow-lg max-h-screen"
                        />
                    ) : (
                        <AssetIsAbsent/>
                    )}
                </div>
            </div>
        </>
    );
};

export default AlbumPage;
