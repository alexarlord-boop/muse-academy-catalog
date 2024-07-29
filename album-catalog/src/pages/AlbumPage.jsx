import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useAlbum from "../hooks/useAlbum.js";

const AlbumPage = () => {
    const {id} = useParams();
    const { album, loading, error } = useAlbum(id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className=" flex-col md:flex-row gap-2 grid grid-cols-2 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2">

                    <img
                        src={album.image_url}
                        alt={`${album.name} cover`}
                        className="object-cover rounded-xl h-auto rounded-lg shadow-lg mb-4 md:mb-0"
                    />
                    <div className="md:ml-6 flex flex-col ">
                        <div className="text-6xl font-bold">{album.name}</div>
                        <p className="text-default-500 text-xl  font-bold">{album.art_creator}</p>
                        <span >
                            <p className="inline text-default-400">{album.issue_date.split('-')[0]} ● </p>
                            <p className="inline text-default-400">{album.genre1}</p>
                        </span>



                        <p className="text-gray-700"><strong>Tracks:</strong> {album.track_number}</p>
                        <p className="text-gray-700"><strong>Format:</strong> {album.format}</p>



                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">About the Album</h2>
                            <p className="text-gray-600 mt-2"><strong>Creation Info:</strong> {album.creation_info}</p>
                            <p className="text-gray-600"><strong>Concept Info:</strong> {album.concept_info}</p>
                            <p className="text-gray-600"><strong>Facts Info:</strong> {album.facts_info}</p>
                        </div>
                    </div>
                </div>
            </div>


        </>

    );
};

export default AlbumPage;
