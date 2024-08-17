import {Pagination} from "@nextui-org/react";
import {useEffect} from "react";
import useCatalog from "../hooks/useCatalog.js";
import {useLocation} from "react-router-dom";

export default function CatalogPagination() {
    const location = useLocation();

    const {albumsNumber, albumsPerPage, handlePageChange} = useCatalog(location.pathname === "/favourites")
    let total = Math.ceil(albumsNumber / albumsPerPage);
    const query = new URLSearchParams(location.search);
    const pageParam = query.get('page');
    console.log(pageParam);
    const currentPage = parseInt(query.get('page'), 10);


    useEffect(() => {
        total = Math.ceil(albumsNumber / albumsPerPage);
        console.log(albumsNumber);
        console.log(currentPage);
        console.log(location);
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