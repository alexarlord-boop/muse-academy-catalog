import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAlbum from "../hooks/useAlbum.js";
import useFormats from "../hooks/useFormats.js";
import useGenres from "../hooks/useGenres.js";
import {Spacer} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {supabase} from "../lib/helper/supabaseClient.js";
import toast from "react-hot-toast";
import EditInput from "../components/EditPageComponents/EditInput.jsx";
import EditSelect from "../components/EditPageComponents/EditSelect.jsx";
import EditText from "../components/EditPageComponents/EditText.jsx";
import PreviewImage from "../components/EditPageComponents/PreviewImage.jsx";
import CustomSpinner from "../components/Spinner.jsx";

const AlbumEditPage = () => {
    const {id} = useParams();
    const {album, loading, error} = useAlbum(id);
    const {formats, loading: formatsLoading, error: formatsError} = useFormats();
    const {genres, loading: genresLoading, error: genresError} = useGenres();
    const navigate = useNavigate();
    const [artists, setArtists] = useState([]);
    const [isNewArtist, setIsNewArtist] = useState(false);
    const [formData, setFormData] = useState({
        art_creator: '',
        name: '',
        creation_info: '',
        concept_info: '',
        image_url: '',
        format: '',
        genre1: '',
        issue_date: '',
        track_number: '',
        new_artist_name: '',
        imageFile: null, // New state for image file
    });

    useEffect(() => {
        // Fetch existing artists from the 'artist' table
        const fetchArtists = async () => {
            const {data, error} = await supabase.from('artist').select('*');
            if (error) {
                toast.error('Failed to load artists');
            } else {
                setArtists(data);
                console.log('Artists:', data);
            }
        };

        fetchArtists();

        if (album) {
            setFormData({
                art_creator: album.art_creator || '',
                name: album.name || '',
                creation_info: album.creation_info || '',
                concept_info: album.concept_info || '',
                image_url: album.image_url || '',
                format: album.format || '',
                genre1: album.genre1 || '',
                issue_date: album.issue_date || '',
                track_number: album.track_number || '',
                new_artist_name: '',
                imageFile: null, // Ensure this is reset on load
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                imageFile: file,
                image_url: URL.createObjectURL(file) // For preview
            });
            console.log(file);
        }
    };

    const handleArtistChange = (e) => {
        const {value} = e.target;
        if (value === 'Add new artist') {
            setIsNewArtist(true);
            setFormData({
                ...formData,
                art_creator: '',
                new_artist_name: '',
            });
        } else {
            setIsNewArtist(false);
            setFormData({
                ...formData,
                art_creator: value,
                new_artist_name: '',
            });
        }
    };

    const handleSave = async () => {
        try {
            let artistId = formData.art_creator;

            // If a new artist is being added
            if (isNewArtist && formData.new_artist_name.trim() !== '') {
                const {data: newArtist, error: newArtistError} = await supabase
                    .from('artist')
                    .insert({name: formData.new_artist_name.trim()})
                    .select();

                if (newArtistError) {
                    toast.error('Failed to add new artist');
                    throw new Error('Error inserting artist:', newArtistError);
                }

                toast.success('New artist added');
                artistId = newArtist[0].name;
            }

            let imageUrl = formData.image_url;

            // If an image file is selected, upload it to Supabase Storage
            if (formData.imageFile) {
                const fileExt = formData.imageFile.name.split('.').pop();
                const fileName = `${id}.${fileExt}`;
                const filePath = `albums/${fileName}`;

                const {error: uploadError} = await supabase
                    .storage
                    .from('muse-catalog') // Make sure your bucket name is correct
                    .upload(filePath, formData.imageFile, {
                        cacheControl: '3600',
                        upsert: true,
                    });

                if (uploadError) {
                    console.error('Error uploading file:', uploadError);
                    toast.error('Failed to upload image');
                    return;
                }

                // Get the public URL for the uploaded image
                const {data: publicUrl} = supabase.storage.from('muse-catalog').getPublicUrl(filePath);
                imageUrl = publicUrl.publicUrl;
                console.log(imageUrl);
            }

            const {data, error} = await supabase
                .from('album')
                .update({
                    art_creator: artistId,
                    name: formData.name.trim(),
                    creation_info: formData.creation_info.trim(),
                    concept_info: formData.concept_info.trim(),
                    image_url: imageUrl.trim(), // Use uploaded image URL or existing URL
                    format: formData.format.trim(),
                    genre1: formData.genre1.trim(),
                    issue_date: formData.issue_date,
                    track_number: formData.track_number,
                })
                .eq('id', id)
                .select();

            if (error) throw error;
            console.log('Album updated:', data);
            toast.success('Album updated');

            navigate(`/catalog/${id}`);
        } catch (error) {
            console.error('Error updating album:', error);
            toast.error('Failed to update album');
        }
    };

    if (loading) return <CustomSpinner/>;
    if (error) return <div>Error: {error}</div>;
    if (formatsError) return <div>Error loading formats: {formatsError}</div>;
    if (genresError) return <div>Error loading genres: {genresError}</div>;

    return (
        <>
            <div className="flex flex-wrap mx-auto p-6 bg-white">
                <div className="w-full md:w-1/2 px-4">
                    <div className="flex">
                        <EditInput size="lg" name="name" type="name" value={formData.name} onChange={handleChange}/>
                        <Spacer x={5}/>
                        <EditInput name="issue_date" type="date" value={formData.issue_date} onChange={handleChange}/>
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
                    <Spacer y={3}/>
                    <div className="flex">
                        <EditSelect name="art_creator" value={formData.art_creator} onChange={handleArtistChange} options={[
                            { id: 'new', name: 'Add new artist' },
                            ...artists,
                        ]}/>
                        <Spacer x={5}/>
                        {isNewArtist && (
                            <EditInput size="lg" name="new_artist_name" type="artist name" placeholder="Enter new artist name"
                                       value={formData.new_artist_name} onChange={handleChange}/>
                        )}
                    </div>

                    <Spacer y={5}/>
                    <div>
                        <h2 className="text-xl font-semibold">About the Album</h2>
                        <Spacer y={2}/>
                        <EditText name="creation_info" value={formData.creation_info} onChange={handleChange}/>
                        <Spacer y={3}/>
                        <EditText name="concept_info" value={formData.concept_info} onChange={handleChange}/>
                        <Spacer y={3}/>
                        <Spacer y={3}/>
                        <input type="file" accept="image/*" onChange={handleFileChange}/>
                        <Spacer y={5}/>
                    </div>
                    <Button onClick={handleSave} className="mx-auto flex py-2">Save</Button>
                    <Spacer y={5}/>
                </div>

                <PreviewImage image_url={formData.image_url}/>

            </div>
        </>
    );
};

export default AlbumEditPage;
