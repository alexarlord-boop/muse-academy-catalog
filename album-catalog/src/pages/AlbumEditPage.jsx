import React from 'react';
import {useParams} from "react-router-dom";

const AlbumEditPage = () => {
    const {id} = useParams();
    return <>
        <h1>AlbumEdit Page</h1>
    </>
}

export default AlbumEditPage;