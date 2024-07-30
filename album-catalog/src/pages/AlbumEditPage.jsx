import React from 'react';
import {useParams} from "react-router-dom";
import useAlbum from "../hooks/useAlbum.js";

const AlbumEditPage = () => {
    const {id} = useParams();
    const { album, loading, error } = useAlbum(id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return <>
        <h1>AlbumEdit Page</h1>
    </>
}

export default AlbumEditPage;