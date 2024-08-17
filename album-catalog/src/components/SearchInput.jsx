import {Input} from "@nextui-org/input";
import useCatalog from "../hooks/useCatalog.js";
import {Button} from "@nextui-org/react";
import React from "react";
import {ButtonGroup} from "@nextui-org/button";
import {FaSearch} from "react-icons/fa";

export default function SearchInput() {
    const {
        handleSearchChange,
        searchTerm,
        updateURL,
        genre,
        format,
    } = useCatalog(location.pathname === "/favourites");
    return (
        <ButtonGroup>
            <Input
                isClearable={true}
                onClear={() => updateURL('', genre, format, 1)}
                radius="none"
                onChange={handleSearchChange}
                value={searchTerm}
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [

                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "bg-transparent",
                        "border-2",
                        "rounded-l-xl",

                    ],
                }}
                placeholder="Search..."
            />
            <Button className="" variant="bordered" isIconOnly={true} onClick={() => {
                updateURL(searchTerm, genre, format, 1);
            }}>
                <FaSearch/>
            </Button>
        </ButtonGroup>

    );
}