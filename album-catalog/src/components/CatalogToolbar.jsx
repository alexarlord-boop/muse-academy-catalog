import SearchInput from "./SearchInput.jsx";
import FilterModal from "./FilterModal.jsx";

export default function CatalogToolbar({
                                           onSearchChange,
                                           searchTerm,
                                           updateURL,
                                           genre,
                                           setGenre,
                                           format,
                                           setFormat,
                                       }) {
    return (
        <div className="flex z-20 justify-around w-full my-2">
            <SearchInput
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                updateURL={updateURL}
                genre={genre}
                format={format}
            />
            <FilterModal
                genre={genre}
                setGenre={setGenre}
                format={format}
                setFormat={setFormat}
                onApplyFilters={(genre, format) => updateURL(searchTerm, genre, format, 1)}
                onClearFilters={() => updateURL(searchTerm, null, null, 1)}
            />

        </div>
    );
}