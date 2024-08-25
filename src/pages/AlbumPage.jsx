import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from 'next-themes'; // Import useTheme for theme detection
import useAlbum from "../hooks/useAlbum.js";
import { Spacer } from "@nextui-org/react";
import { AssetIsAbsent } from "../components/icons/AssetIsAbsent.jsx";
import { Button } from "@nextui-org/button";
import { SessionContext } from "../context/SessionContext.jsx";
import { TbEdit, TbTrashX } from "react-icons/tb";
import useModalStore from "../hooks/useStore.js";
import { useDeleteRecord } from "../hooks/useDeleteRecord.js";
import { deleteModalStrings, getPublishModalStrings } from "../strings.js";
import { BiHide, BiShow } from "react-icons/bi";
import usePublishToggle from "../hooks/usePublishToggle.js";
import { CiPen } from "react-icons/ci";
import Loader from "../components/Loader.jsx";

const AlbumPage = () => {
    const { id } = useParams();
    const { album, loading, error } = useAlbum(id);
    const navigate = useNavigate();
    const { session, role } = useContext(SessionContext);

    const { openModal, setModalContent, updateOperation } = useModalStore();
    const { handlePublishToggle, isProcessing, isPublic, setIsPublic } = usePublishToggle(album);

    const { deleteRecord, deleteLoading, deleteError } = useDeleteRecord();

    const { theme, setTheme } = useTheme(); // Use theme from next-themes

    const handleDelete = async () => {
        await deleteRecord('album', 'id', album.id, '/catalog/?page=1');
    };

    const handleOpenDeleteModal = () => {
        setModalContent(deleteModalStrings);
        updateOperation(handleDelete);
        openModal();
    };

    const handleOpenPublishModal = () => {
        setModalContent(getPublishModalStrings(isPublic ? 'archive' : 'publish'));
        updateOperation(handlePublishToggle);
        openModal();
    };

    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Spacer y={5} />
            <div className="flex flex-wrap mx-auto bg-white dark:bg-black p-5 rounded-lg shadow-lg">
                <div className="w-full md:w-1/2 max-h-full px-4">
                    <div className="text-6xl font-bold text-black dark:text-white">{album.name}</div>
                    <Spacer y={3} />
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-300">{album.art_creator}</p>
                    <span>
            <p className="inline text-gray-600 dark:text-gray-400">{album.issue_date.split('-')[0]} ● </p>
            <p className="inline text-gray-600 dark:text-gray-400">{album.genre1}</p>
          </span>
                    <Spacer y={10} />
                    <p className="text-gray-700 dark:text-gray-400"><strong>Tracks:</strong> {album.track_number}</p>
                    <p className="text-gray-700 dark:text-gray-400"><strong>Format:</strong> {album.format}</p>
                    <Spacer y={10} />
                    <div>
                        <h2 className="text-xl font-semibold text-black dark:text-white">About the Album</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2"><strong>Creation Info:</strong> {album.creation_info}</p>
                        <Spacer y={3} />
                        <p className="text-gray-600 dark:text-gray-400"><strong>Concept Info:</strong> {album.concept_info}</p>
                        <Spacer y={5} />
                    </div>

                    {session?.user && role === "REDACTOR" && (
                        <div className="flex gap-2">
                            <Button
                                onClick={() => navigate('/catalog/edit/' + album.id)}
                                className="mx-auto flex py-2 bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
                                startContent={<CiPen />}
                            >
                                Edit
                            </Button>

                            <Button
                                className="gap-2 flex py-2 bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
                                onClick={handleOpenPublishModal}
                                startContent={isPublic ? <BiHide /> : <BiShow />}
                                disabled={isProcessing}
                            >
                                {isPublic ? 'Archive' : 'Publish'}
                            </Button>

                            <Button
                                onClick={handleOpenDeleteModal}
                                className="mx-auto flex py-2 bg-red-600 text-white dark:bg-red-700"
                                startContent={<TbTrashX />}
                            >
                                Delete
                            </Button>
                        </div>
                    )}

                    <Spacer y={5} />
                </div>

                <div className="w-full md:w-1/2 px-4 flex justify-center items-center">
                    {album.image_url ? (
                        <img
                            src={album.image_url}
                            alt={`${album.name} cover`}
                            className="object-cover rounded-xl shadow-lg max-h-screen"
                        />
                    ) : (
                        <AssetIsAbsent />
                    )}
                </div>
                <Spacer y={5} />
            </div>
        </>
    );
};

export default AlbumPage;
