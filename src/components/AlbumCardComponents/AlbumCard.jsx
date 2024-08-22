import React, {useContext} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Image,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
} from "@nextui-org/react";
import {HeartIcon} from "../icons/HeartIcon.jsx";
import {SessionContext} from "../../context/SessionContext.jsx";
import {useNavigate} from "react-router-dom";
import {AssetIsAbsent} from "../icons/AssetIsAbsent.jsx";
import useLikeAlbum from "../../hooks/useLikeAlbum.js";
import {BsThreeDots} from "react-icons/bs";
import useChangePublicState from "../../hooks/useChangePublicState.js";
import ContextToggle from "./ContextToggle.jsx";

export default function AlbumCard({album, variant = "catalog", isPublic}) {
    const {session, role} = useContext(SessionContext);
    const navigate = useNavigate();

    // Assume session.user.id is the user's id (replace as needed)
    const userId = session?.user?.id;
    const {isLiked, toggleLike} = useLikeAlbum(album.id, album.isLiked);

    return (
        <Card key={album.id} className=" w-[238px] h-[355px]  border-black border-1 hover:border-gray-900">
            <CardBody
                className="p-0 m-0 overflow-visible cursor-pointer hover:scale-105 ease-out duration-300"
                onClick={() => navigate("/catalog/" + album.id)}
            >
                {album.image_url ? (
                    <Image
                        alt="Card background"
                        className="object-fit rounded-none"
                        src={album.image_url}
                        width={300}
                        height={300} // Ensure consistent image size
                    />
                ) : (
                    <AssetIsAbsent/>
                )}
            </CardBody>

            <CardHeader className="px-4 py-2 flex-col items-start relative">
                <h4 className="font-bold text-large leading-tight max-h-[48px] line-clamp-2 lg:text-md ">{album.name}</h4>
                <p className="text-default-400 uppercase font-bold">{album.art_creator}</p>
                <span className="text-default-400">
                    <small>{album.issue_date.split("-")[0]} ● </small>
                    <small>{album.genre1}</small>
                </span>

                {session?.user && location.pathname !== "/unpublished" && (
                    <Button
                        isIconOnly
                        className="text-red-600 hover:bg-red-200 absolute bottom-2 right-2"
                        radius="full"
                        variant="light"
                        onClick={() => toggleLike(userId)}
                        color={isLiked ? "error" : "primary"}
                    >
                        <HeartIcon
                            className={isLiked ? "[&>path]:stroke-transparent" : ""}
                            fill={isLiked ? "red" : "none"}
                        />
                    </Button>
                )}

                <ContextToggle album={album}/>


            </CardHeader>
        </Card>
    );
}
