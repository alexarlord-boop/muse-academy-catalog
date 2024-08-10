import {Pagination} from "@nextui-org/react";
import {useEffect, useLayoutEffect} from "react";
import useCatalog from "../hooks/useCatalog.js";

export default function CatalogPagination({currentPage}) {

    const {searchTerm, filteredAlbums, albumsNumber, albumsPerPage, handlePageChange} = useCatalog()
    let total = Math.ceil(albumsNumber / albumsPerPage);

    useEffect(() => {
        total = Math.ceil(albumsNumber / albumsPerPage);
        console.log(total);
    }, [filteredAlbums, currentPage, albumsNumber]);

    return (
        albumsNumber > 10 && (
            <Pagination
                size="sm"
                isCompact
                className="flex justify-center my-1"
                total={total}
                showControls
                initialPage={currentPage}  // Use `page` prop to control the current page
                onChange={handlePageChange}
            />
        )
    );
}