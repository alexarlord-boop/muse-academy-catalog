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
import {deleteModalStrings, getPublishModalStrings} from "../../strings.js";
import useModalStore from "../../hooks/useStore.js";
import {useDeleteRecord} from "../../hooks/useDeleteRecord.js";
import useAlbumStore from "../../hooks/useAlbumsStore.js";
import usePublishToggle from "../../hooks/usePublishToggle.js";
import {CiPen} from "react-icons/ci";
import {BiHide, BiShow} from "react-icons/bi";

export default function ContextToggle({album}) {
    const {session, role} = useContext(SessionContext);
    const navigate = useNavigate();
    const {filteredAlbums, setFilteredAlbums} = useAlbumStore();

    const {changePublicState, loading, error} = useChangePublicState();
    const {openModal, setModalContent, updateOperation} = useModalStore();
    const {deleteRecord} = useDeleteRecord();

    const { handlePublishToggle, isProcessing, isPublic, setIsPublic } = usePublishToggle(album);


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


    const handleOpenPublishModal = () => {

        setModalContent(getPublishModalStrings(isPublic ? 'archive' : 'publish'));
        updateOperation(handlePublishToggle);
        openModal();
    }

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
                            onClick={handleOpenPublishModal}
                            disabled={loading}
                            startContent={isPublic ? <BiHide/> : <BiShow/>}
                        >
                            {`${album.is_public ? 'Archive' : 'Publish'} album`}
                        </DropdownItem>
                        <DropdownItem
                            key="edit"
                            description="Allows you to edit the album"
                            onClick={() => navigate("/catalog/edit/" + album.id)}
                            startContent={<CiPen/>}
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
