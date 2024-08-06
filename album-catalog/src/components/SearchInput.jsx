import {Input} from "@nextui-org/input";
import useCatalog from "../hooks/useCatalog.js";

export default function SearchInput() {
    const {
        handleSearchChange,
        searchTerm,
        updateURL,
        genre,
        format,
    } = useCatalog();
    return (
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
            placeholder="Type to search..."
        />
    );
}