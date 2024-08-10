import {Input} from "@nextui-org/input";
import useCatalog from "../hooks/useCatalog.js";
import {FaFilter} from "react-icons/fa6";
import {Button} from "@nextui-org/react";
import React from "react";
import {CiSearch} from "react-icons/ci";
import {ButtonGroup} from "@nextui-org/button";

export default function SearchInput() {
    const {
        handleSearchChange,
        handleSearch,
        searchTerm,
        updateURL,
        genre,
        format,
    } = useCatalog();
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
                handleSearch(searchTerm, 1, genre, format);
                updateURL(searchTerm, genre, format, 1);
            }}>
                <CiSearch/>
            </Button>
        </ButtonGroup>

    );
}