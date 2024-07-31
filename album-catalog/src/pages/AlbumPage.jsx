import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useAlbum from "../hooks/useAlbum.js";
import {Spacer} from "@nextui-org/react";
import {AssetIsAbsent} from "../components/icons/AssetIsAbsent.jsx";
import {Button} from "@nextui-org/button";

const AlbumPage = () => {
    const {id} = useParams();
    const {album, loading, error} = useAlbum(id);
    const navigate = useNavigate();


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="flex flex-wrap mx-auto p-6 bg-white">
                <div className="w-full md:w-1/2 max-h-full px-4">
                    <div className="text-6xl font-bold">{album.name}</div>
                    <Spacer y={3}/>
                    <p className="text-default-500 text-xl font-bold">{album.art_creator}</p>
                    <span>
                    <p className="inline text-default-400">{album.issue_date.split('-')[0]} ● </p>
                    <p className="inline text-default-400">{album.genre1}</p>
                </span>
                    <Spacer y={10}/>
                    <p className="text-gray-700"><strong>Tracks:</strong> {album.track_number}</p>
                    <p className="text-gray-700"><strong>Format:</strong> {album.format}</p>
                    <Spacer y={10}/>
                    <div >
                        <h2 className="text-xl font-semibold">About the Album</h2>
                        <p className="text-gray-600 mt-2"><strong>Creation Info:</strong> {album.creation_info}</p>
                        <Spacer y={3}/>
                        <p className="text-gray-600"><strong>Concept Info:</strong> {album.concept_info}</p>
                        {/*<Spacer y={3}/>*/}
                        {/*<p className="text-gray-600"><strong>Facts Info:</strong> {album.facts_info}</p>*/}
                        <Spacer y={5}/>
                    </div>
                    <Button onClick={() => navigate('/catalog/edit/' + album.id)} className="mx-auto flex py-2">Edit</Button>

                    <Spacer y={5}/>
                </div>

                <div className="w-full md:w-1/2 px-4 flex justify-center items-center">
                    {album.image_url ? (
                        <img
                            src={album.image_url}
                            alt={`${album.name} cover`}
                            className="object-cover rounded-xl shadow-lg max-h-screen"
                        />
                    ) : (
                        <AssetIsAbsent/>
                    )}

                </div>
            </div>

        </>

    );
};

export default AlbumPage;
