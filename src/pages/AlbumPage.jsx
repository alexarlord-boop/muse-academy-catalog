import React, {useContext, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useAlbum from "../hooks/useAlbum.js";
import {Spacer} from "@nextui-org/react";
import {AssetIsAbsent} from "../components/icons/AssetIsAbsent.jsx";
import {Button} from "@nextui-org/button";
import {SessionContext} from "../context/SessionContext.jsx";
import {TbEdit, TbTrashX} from "react-icons/tb";
import useModalStore from "../hooks/useStore.js";
import {useDeleteRecord} from "../hooks/useDeleteRecord.js";
import {deleteModalStrings} from "../strings.js";
import {BiHide, BiShow} from "react-icons/bi";
import usePublishToggle from "../hooks/usePublishToggle.js";
import {CiPen} from "react-icons/ci";
import Loader from "../components/Loader.jsx";

const AlbumPage = () => {
    const {id} = useParams();
    const {album, loading, error} = useAlbum(id);
    const navigate = useNavigate();
    const {session, role} = useContext(SessionContext);

    const {openModal, setModalContent, updateOperation} = useModalStore();
    const {handlePublishToggle, isProcessing, isPublic, setIsPublic} = usePublishToggle(album);


    const {deleteRecord, deleteLoading, deleteError} = useDeleteRecord();

    const handleDelete = async () => {
        await deleteRecord('album', 'id', album.id, '/catalog/?page=1' );
    };

    const handleOpenModal = () => {
        setModalContent(deleteModalStrings);
        updateOperation(handleDelete);
        openModal();
    };


    if (loading) return <Loader/>;
    if (error) return <div>Error: {error}</div>;


    return (
        <>
            <Spacer y={5}/>
            <div className="flex flex-wrap mx-auto bg-white">
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
                        <div className="flex gap-2">
                            <Button onClick={() => navigate('/catalog/edit/' + album.id)}
                                    className="mx-auto flex py-2"
                                    startContent={<CiPen/>}
                            >Edit</Button>

                            <Button
                                className="gap-2 flex py-2"
                                onClick={handlePublishToggle}
                                startContent={isPublic ? <BiHide/> : <BiShow/>}
                                disabled={isProcessing}
                            >


                                {isPublic ? 'Archive' : 'Publish'}
                            </Button>

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
                <Spacer y={5}/>
            </div>
        </>
    );
};

export default AlbumPage;
