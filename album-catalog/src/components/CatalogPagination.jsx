import {Pagination} from "@nextui-org/react";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function CatalogPagination({albumsNumber, albumsPerPage, onPageChange}) {
    const location = useLocation();

    let total = Math.ceil(albumsNumber / albumsPerPage);
    const query = new URLSearchParams(location.search);
    const currentPage = parseInt(query.get('page'), 10);


    useEffect(() => {
        total = Math.ceil(albumsNumber / albumsPerPage);
    }, [location]);

    return (
        albumsNumber > albumsPerPage && (
            <Pagination
                size="sm"
                isCompact
                className="flex justify-center my-1"
                total={total}
                page={currentPage}
                showControls
                onChange={(page) => onPageChange(page)}
            />
        )
    );
}