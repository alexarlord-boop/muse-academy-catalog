import {Pagination} from "@nextui-org/react";
import {useEffect} from "react";
import useCatalog from "../hooks/useCatalog.js";
import {useLocation} from "react-router-dom";

export default function CatalogPagination() {
    const location = useLocation();

    const {albumsNumber, albumsPerPage, handlePageChange} = useCatalog()
    let total = Math.ceil(albumsNumber / albumsPerPage);
    const currentPage = parseInt(new URLSearchParams(location.search).get('page')) || 1;

    useEffect(() => {
        total = Math.ceil(albumsNumber / albumsPerPage);
        console.log(albumsNumber, albumsPerPage);
        console.log(location.search, total, currentPage);
    }, [location]);

    return (
        albumsNumber > albumsPerPage && (
            <Pagination
                size="sm"
                isCompact
                className="flex justify-center my-1"
                total={total}
                page={currentPage}  // Use `page` prop for dynamic updates
                showControls
                onChange={(page) => handlePageChange(page)}  // Trigger page change
            />
        )
    );
}