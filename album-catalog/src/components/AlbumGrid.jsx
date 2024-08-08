import React from "react";
import AlbumCard from "./AlbumCard";
import toast from "react-hot-toast";

export default function AlbumGrid({ filteredAlbums, setFilteredAlbums }) {

    const notify = (msg) => toast(msg);

    const onCardDeleted = (deletedAlbum) => {
        const newAlbums = filteredAlbums.filter((album) => album !== deletedAlbum);
        setFilteredAlbums(newAlbums);
        notify("Album deleted");
    };

    return (

        <div className="mt-3 gap-2 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
            {filteredAlbums.length > 0 ? (
                filteredAlbums.map((album) => (
                    // TODO:- refactor card styles
                    <AlbumCard album={album} onCardDeleted={onCardDeleted} key={album.id} />
                ))
            ) : (
                <p>No albums found</p>
            )}
        </div>
    );
}
