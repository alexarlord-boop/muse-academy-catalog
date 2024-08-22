import {FaPlus} from "react-icons/fa";
import {Button} from "@nextui-org/button";
import React, {useContext} from "react";
import {SessionContext} from "../context/SessionContext.jsx";
import useSampleAlbum from "../hooks/useSampleAlbum.js";

export default function AddButton() {
    const isPathActive = location.pathname.includes('edit');
    const {session, role} = useContext(SessionContext);
    const {addSampleAlbum} = useSampleAlbum();

    const showAddBtn = session?.user && role === "REDACTOR";
    return (
        <>
            {showAddBtn &&
                <Button
                    variant="bordered"
                    isIconOnly={true}
                    disabled={isPathActive}
                    onClick={addSampleAlbum}
                    className={`${isPathActive ? 'border-gray-300 text-gray-300 bg-gray-100 cursor-not-allowed' :
                        'border-black text-black bg-transparent hover:bg-black hover:text-white transition'} rounded-full p-2`}
                >
                    <FaPlus/>
                </Button>}
        </>
    );
}