import {Input} from "@nextui-org/input";

export default function SearchInput({ searchTerm, onSearchChange, updateURL, genre, format }) {
    return (
        <Input
            isClearable={true}
            onClear={() => updateURL('', genre, format, 1)}
            size="sm"
            radius="lg"
            onChange={onSearchChange}
            value={searchTerm}
            classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                    "w-1/3 mx-auto border-2",
                    "shadow-md",
                    "bg-white",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                ],
            }}
            placeholder="Type to search..."
        />
    );
}