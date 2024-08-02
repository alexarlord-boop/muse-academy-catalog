import {Pagination} from "@nextui-org/react";

export default function CatalogPagination({ albumsNumber, albumsPerPage, currentPage, onPageChange }) {
    return (
        albumsNumber > 0 && (
            <Pagination
                size="sm"
                isCompact
                className="flex justify-center my-1"
                loop
                showControls={Math.ceil(albumsNumber / albumsPerPage) > 1}
                showShadow={true}
                total={Math.ceil(albumsNumber / albumsPerPage)}
                initialPage={currentPage}
                onChange={onPageChange}
            />
        )
    );
}