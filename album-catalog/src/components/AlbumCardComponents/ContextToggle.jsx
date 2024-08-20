import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from "@nextui-org/react";
import {BsThreeDots} from "react-icons/bs";
import React, {useContext} from "react";
import {SessionContext} from "../../context/SessionContext.jsx";
import useChangePublicState from "../../hooks/useChangePublicState.js";
import {useNavigate} from "react-router-dom";
import {deleteModalStrings} from "../../strings.js";
import useModalStore from "../../hooks/useStore.js";
import {useDeleteRecord} from "../../hooks/useDeleteRecord.js";
import useAlbumStore from "../../hooks/useAlbumsStore.js";
import toast from "react-hot-toast";

export default function ContextToggle({album}) {
    const {session, role} = useContext(SessionContext);
    const navigate = useNavigate();
    const {filteredAlbums, setFilteredAlbums} = useAlbumStore();

    const {changePublicState, loading, error} = useChangePublicState();
    const {openModal, setModalContent, updateOperation} = useModalStore();
    const {deleteRecord} = useDeleteRecord();

    const handlePublishToggle = async () => {
        let newAlbums = filteredAlbums;
        const newState = !album.is_public; // Toggle the current state

        const success = await changePublicState(album.id, newState);
        if (success) {
            // Update the album's public state in the filteredAlbums
            const updatedAlbums = filteredAlbums.map((a) =>
                a.id === album.id ? {...a, is_public: newState} : a
            );
            setFilteredAlbums(updatedAlbums);

            newAlbums = filteredAlbums.filter((a) => a.id !== album.id);
            setFilteredAlbums(newAlbums);


            // Show a success toast notification
            toast.success(`Album ${newState ? 'published' : 'unpublished'} successfully`);
        } else {
            // Handle error, maybe show a notification
            console.error('Failed to change the album public state:', error);
            toast.error('Failed to change the album public state');
        }
    };

    const handleDelete = async (albumId) => {
        const newAlbums = filteredAlbums.filter((a) => a.id !== albumId);

        const success = await deleteRecord('album', 'id', albumId, newAlbums.length === 0 ? "/catalog/?page=1" : null);
        setFilteredAlbums(newAlbums);
    };

    const handleOpenModal = (forAlbumId) => {
        setModalContent(deleteModalStrings);
        updateOperation(() => handleDelete(forAlbumId));
        openModal();
    };

    const handleDeleteClick = () => handleOpenModal(album.id);

    return (
        session?.user && role === "REDACTOR" && (
            <Dropdown
                showArrow
                classNames={{
                    base: "before:bg-default-900",
                    content: "p-0 border-small border-divider bg-background border-gray-900",
                }}
            >
                <DropdownTrigger>
                    <Button
                        isIconOnly
                        className="text-gray-600 bg-grey-100 absolute bottom-10 right-2"
                        radius="full"
                        variant="light"
                    >
                        <BsThreeDots/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                    <DropdownSection title="" showDivider>
                        <DropdownItem
                            key="status"
                            description={`Allows you to ${album.is_public ? 'unpublish' : 'publish'} the album`}
                            onClick={handlePublishToggle}
                            disabled={loading}
                        >
                            {loading
                                ? `${album.is_public ? 'Unpublishing' : 'Publishing'}...`
                                : `${album.is_public ? 'Unpublish' : 'Publish'} album`}
                        </DropdownItem>
                        <DropdownItem
                            key="edit"
                            description="Allows you to edit the album"
                            onClick={() => navigate("/catalog/edit/" + album.id)}
                        >
                            Edit album
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownSection title="Danger zone">
                        <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            description="Permanently delete the album"
                            onClick={handleDeleteClick}
                        >
                            Delete album
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        )
    );
}
