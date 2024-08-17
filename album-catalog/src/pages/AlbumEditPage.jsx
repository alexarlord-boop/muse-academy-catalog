import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useAlbum from "../hooks/useAlbum.js";
import useFormats from "../hooks/useFormats.js";
import useGenres from "../hooks/useGenres.js";
import { Spacer } from "@nextui-org/react";
import { AssetIsAbsent } from "../components/icons/AssetIsAbsent.jsx";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { supabase } from "../lib/helper/supabaseClient.js";
import toast from "react-hot-toast";

const AlbumEditPage = () => {
    const { id } = useParams();
    const { album, loading, error } = useAlbum(id);
    const { formats, loading: formatsLoading, error: formatsError } = useFormats();
    const { genres, loading: genresLoading, error: genresError } = useGenres();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        creation_info: '',
        concept_info: '',
        image_url: '',
        format: '',
        genre1: '',
        issue_date: '',
        track_number: ''
    });

    useEffect(() => {
        if (album) {
            setFormData({
                name: album.name || '',
                creation_info: album.creation_info || '',
                concept_info: album.concept_info || '',
                image_url: album.image_url || '',
                format: album.format || '',
                genre1: album.genre1 || '',
                issue_date: album.issue_date || '',
                track_number: album.track_number || ''
            });
        }
    }, [album]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const { data, error } = await supabase
                .from('album') // Replace with your table name
                .update({
                    name: formData.name.trim(),
                    creation_info: formData.creation_info.trim(),
                    concept_info: formData.concept_info.trim(),
                    image_url: formData.image_url.trim(),
                    format: formData.format.trim(),
                    genre1: formData.genre1.trim(),
                    issue_date: formData.issue_date,
                    track_number: formData.track_number,
                })
                .eq('id', id) // Update the album with the matching ID
                .select();

            if (error) throw error;
            console.log('Album updated:', data);
            toast.success('Album updated');

            // Navigate back to the album details page or show a success message
            navigate(`/catalog/${id}`);
        } catch (error) {
            console.error('Error updating album:', error);
        }
    };

    if (loading || formatsLoading || genresLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (formatsError) return <div>Error loading formats: {formatsError}</div>;
    if (genresError) return <div>Error loading genres: {genresError}</div>;

    // TODO:- creation via draft-publish
    return (
        <>
            <div className="flex flex-wrap mx-auto p-6 bg-white">
                <div className="w-full md:w-1/2 px-4">
                    <Input
                        name="name"
                        placeholder="Enter album name"
                        value={formData.name}
                        onChange={handleChange}
                        className="text-6xl font-bold border-black border-dashed border-1 rounded-xl"
                    />
                    <Spacer y={3} />
                    <p className="text-default-500 text-xl font-bold">{album.art_creator}</p>
                    <span>

                        <Input
                            type="date"
                            name="issue_date"
                            value={formData.issue_date}
                            onChange={handleChange}
                            className="border-black border-dashed border-1 mt-2 rounded-xl"
                        />
                        <Spacer y={3}/>
                         <div className="flex">
                             <select
                                 name="format"
                                 value={formData.format}
                                 onChange={handleChange}
                                 className="flex w-2/5 text-default-400 border-black border-dashed border-1 rounded-xl"
                             >
                                {formats.map(format => (
                                    <option key={format.id} value={format.name}>
                                        {format.name}
                                    </option>
                                ))}
                            </select>
                        <Spacer x={5}/>
                        <select
                            name="genre1"
                            value={formData.genre1}
                            onChange={handleChange}
                            className="flex w-2/5 text-default-400 border-black border-dashed border-1 rounded-xl"
                        >
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.name}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                              <Spacer x={5}/>
                              <Input
                                  type="number"
                                  name="track_number"
                                  placeholder="# Tracks"
                                  value={formData.track_number}
                                  onChange={handleChange}
                                  className="flex w-1/5 text-default-400 border-black border-dashed border-1 rounded-xl"
                              />
                         </div>
                    </span>
                    <Spacer y={5}/>
                    <div>
                        <h2 className="text-xl font-semibold">About the Album</h2>
                        <Spacer y={2}/>
                        <div className="text-gray-600 mt-2">
                            <strong>Creation Info:</strong>
                            <Textarea
                                maxRows={6}
                                name="creation_info"
                                labelPlacement="outside"
                                placeholder="Enter creation info"
                                value={formData.creation_info}
                                onChange={handleChange}
                                className="border-black border-dashed border-1 rounded-xl"
                            />
                        </div>
                        <Spacer y={3} />
                        <div className="text-gray-600">
                            <strong>Concept Info:</strong>
                            <Textarea
                                maxRows={6}
                                name="concept_info"
                                labelPlacement="outside"
                                placeholder="Enter concept info"
                                value={formData.concept_info}
                                onChange={handleChange}
                                className="border-black border-dashed border-1 rounded-xl"
                            />
                        </div>

                        <Spacer y={3} />
                        <Input
                            name="image_url"
                            placeholder="Enter image URL"
                            value={formData.image_url}
                            onChange={handleChange}
                            className="border-black border-dashed border-1 mt-2 rounded-xl"
                        />
                        <Spacer y={5} />
                    </div>
                    <Button onClick={handleSave} className="mx-auto flex py-2">Save</Button>
                    <Spacer y={5}/>
                </div>
                <div className="w-full md:w-1/2 px-4 flex flex-col justify-center items-center">
                    {formData.image_url ? (
                        <img
                            src={formData.image_url}
                            alt={`${formData.name} cover`}
                            className="object-cover rounded-xl shadow-lg max-h-screen"
                        />
                    ) : (
                        <AssetIsAbsent />
                    )}
                </div>
            </div>
        </>
    );
};

export default AlbumEditPage;
