import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAlbum from "../hooks/useAlbum.js";
import useFormats from "../hooks/useFormats.js";
import useGenres from "../hooks/useGenres.js";
import {Spacer} from "@nextui-org/react";
import {AssetIsAbsent} from "../components/icons/AssetIsAbsent.jsx";
import {Input, Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {supabase} from "../lib/helper/supabaseClient.js";
import toast from "react-hot-toast";
import EditInput from "../components/EditPageComponents/EditInput.jsx";
import EditSelect from "../components/EditPageComponents/EditSelect.jsx";
import EditText from "../components/EditPageComponents/EditText.jsx";

const AlbumEditPage = () => {
    const {id} = useParams();
    const {album, loading, error} = useAlbum(id);
    const {formats, loading: formatsLoading, error: formatsError} = useFormats();
    const {genres, loading: genresLoading, error: genresError} = useGenres();
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
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const {data, error} = await supabase
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
                    <p className="text-default-500 text-xl font-bold">{album.art_creator}</p>
                    <Spacer y={3}/>
                    <div className="flex">
                        <EditInput size="lg" name="name" type="name" value={formData.name} onChange={handleChange}/>
                        <Spacer x={5}/>
                        <EditInput type="date" value={formData.issue_date} onChange={handleChange}/>

                    </div>
                    <Spacer y={3}/>
                    <div className="flex">
                        <EditSelect name="format" value={formData.format} onChange={handleChange} options={formats}/>
                        <Spacer x={5}/>
                        <EditSelect name="genre1" value={formData.genre1} onChange={handleChange} options={genres}/>
                        <Spacer x={5}/>
                        <EditInput size="md" name="track_number" type="number" value={formData.track_number}
                                   onChange={handleChange}/>
                    </div>

                    <Spacer y={5}/>
                    <div>
                        <h2 className="text-xl font-semibold">About the Album</h2>
                        <Spacer y={2}/>
                        <EditText name="creation_info" value={formData.creation_info} onChange={handleChange}/>
                        <Spacer y={3}/>
                        <EditText name="concept_info" value={formData.concept_info} onChange={handleChange}/>
                        <Spacer y={3}/>
                        <EditInput size="lg" type="image_url" value={formData.image_url} onChange={handleChange}/>
                        <Spacer y={5}/>
                    </div>
                    <Button onClick={handleSave} className="mx-auto flex py-2">Save</Button>
                    <Spacer y={5}/>
                </div>
                <div className="w-full md:w-1/2 px-4 flex ">
                    {formData.image_url ? (
                        <img
                            src={formData.image_url}
                            alt={`${formData.name} cover`}
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

export default AlbumEditPage;
