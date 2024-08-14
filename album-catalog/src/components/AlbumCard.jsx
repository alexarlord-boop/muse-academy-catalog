import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Image,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection, DropdownItem
} from "@nextui-org/react";
import {supabase} from "../lib/helper/supabaseClient.js";
import {HeartIcon} from "./icons/HeartIcon.jsx";
import React, {useContext, useState} from "react";
import {SessionContext} from "../context/SessionContext.jsx";
import {useNavigate} from "react-router-dom";
import {AssetIsAbsent} from "./icons/AssetIsAbsent.jsx";


export default function AlbumCard({album, handleDeleteClick}) {
    const {session, role} = useContext(SessionContext);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    function handleLikeClick(event) {
        event.stopPropagation(); // TODO:- like is not liking
        setLiked((prevState) => !prevState);
    }






    return (
        <Card key={album.id} className=" max-h-[340px]  border-transparent hover:border-gray-900 w-270">
            <CardBody className="p-0 m-0 overflow-visible cursor-pointer hover:scale-105 ease-out duration-300" onClick={() => navigate('/catalog/' + album.id)}>
                {album.image_url ? (
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xs"
                        src={album.image_url}
                        width={270}
                        height={270} // Ensure consistent image size
                    />
                ) : (
                    <AssetIsAbsent/>
                )}
            </CardBody>
            <CardHeader className=" px-4 flex-col items-start">
                <h4 className="font-bold text-large">{album.name}</h4>
                <p className="text-default-400 uppercase font-bold">{album.art_creator}</p>

                <span>
                    <small className="text-default-400">{album.issue_date.split('-')[0]} ● </small>
                    <small className="text-default-400">{album.genre1}</small>
                </span>
                {
                    session?.user && <Button
                        isIconOnly
                        className="text-red-600 data-[hover]:bg-red-100 absolute bottom-2 right-2"
                        radius="full"
                        variant="light"
                        onPress={(e) => handleLikeClick(e)}
                    >
                        <HeartIcon
                            className={liked ? "[&>path]:stroke-transparent" : ""}
                            fill={liked ? "currentColor" : "none"}
                        />
                    </Button>
                }

                {session?.user && role === "REDACTOR" &&
                    <Dropdown
                        showArrow
                        classNames={{
                            base: "before:bg-default-900", // change arrow background
                            content: "p-0 border-small border-divider bg-background border-gray-900",
                        }}
                    >
                        <DropdownTrigger>
                            <Button
                                isIconOnly
                                className="text-gray-600 bg-grey-100 absolute bottom-15 right-2"
                                radius="full"
                                variant="light"
                            >
                                ...
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                            <DropdownSection title="" showDivider>
                                <DropdownItem
                                    key="edit"
                                    description="Allows you to edit the album"
                                    onClick={() => navigate('/catalog/edit/' + album.id)}
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
                }
            </CardHeader>
        </Card>
    );
}
