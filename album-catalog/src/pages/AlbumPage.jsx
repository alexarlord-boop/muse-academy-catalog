import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useAlbum from "../hooks/useAlbum.js";
import {Spacer} from "@nextui-org/react";
import {AssetIsAbsent} from "../components/icons/AssetIsAbsent.jsx";

const AlbumPage = () => {
    const {id} = useParams();
    const {album, loading, error} = useAlbum(id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="flex mx-auto p-6 bg-white">

                <div className="col-6">

                    <div className="text-6xl font-bold">{album.name}</div>
                    <Spacer y={3}/>
                    <p className="text-default-500 text-xl  font-bold">{album.art_creator}</p>
                    <span>
                            <p className="inline text-default-400">{album.issue_date.split('-')[0]} ● </p>
                            <p className="inline text-default-400">{album.genre1}</p>
                        </span>

                    <Spacer y={10}/>

                    <p className="text-gray-700"><strong>Tracks:</strong> {album.track_number}</p>
                    <p className="text-gray-700"><strong>Format:</strong> {album.format}</p>

                    <Spacer y={10}/>


                    <div>
                        <h2 className="text-xl font-semibold">About the Album</h2>
                        <p className="text-gray-600 mt-2"><strong>Creation Info:</strong> {album.creation_info}</p>
                        <p className="text-gray-600"><strong>Concept Info:</strong> {album.concept_info}</p>
                        <p className="text-gray-600"><strong>Facts Info:</strong> {album.facts_info}</p>
                    </div>

                </div>
                <div className="col-6">
                    {album.image_url ? (
                        <img
                            src={album.image_url}
                            alt={`${album.name} cover`}
                            className="object-cover rounded-xl h-3/4 rounded-lg shadow-lg mb-4 md:mb-0"
                        />
                    ) : (
                        <AssetIsAbsent/>
                    )
                    }

                   </div>


            </div>


        </>

    );
};

export default AlbumPage;
