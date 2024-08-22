import {Pagination} from "@nextui-org/react";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAlbumStore from "../hooks/useAlbumsStore.js";

export default function CatalogPagination() {

    const {
        albumsNumber,
        albumsPerPage,
        searchTerm,
        genre,
        format,
    } = useAlbumStore();

    const location = useLocation();
    const navigate = useNavigate();


    let total = Math.ceil(albumsNumber / albumsPerPage);
    const query = new URLSearchParams(location.search);
    const currentPage = parseInt(query.get('page'), 10);

    const updateURL = (search, genre, format, page) => {
        const query = new URLSearchParams();
        if (search) query.set('search', search);
        if (genre) query.set('genre', genre);
        if (format) query.set('format', format);
        if (page) query.set('page', page);

        navigate(`?${query.toString()}`);
    };

    const onPageChange = (page) => {
        updateURL(searchTerm, genre, format, page);
    }

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