import { useCallback } from 'react';
import { supabase } from "../lib/helper/supabaseClient.js";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useSampleAlbum = (handleSearch, searchTerm, currentPage, genre, format) => {
    const navigate = useNavigate();
    const notify = (msg) => toast(msg);

    const addSampleAlbum = useCallback(async () => {
        try {
            const sampleAlbum = {
                created_at: new Date().toISOString(),
                name: 'Sample Album',
                art_creator: 'Sample Artist',
                issue_date: new Date().toISOString(),
                track_number: 12,
                image_url: '',
                creation_info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
                concept_info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
                facts_info: [],
                genre1: 'POP',
                format: 'CD'
            };

            const { data, error } = await supabase
                .from('album')
                .insert([sampleAlbum])
                .select();

            if (error) throw error;

            navigate('/catalog/edit/' + data[0].id);

        } catch (error) {
            console.error('Error adding sample album:', error);
            notify('Failed to add album');
        }
    }, [handleSearch, searchTerm, currentPage, genre, format, navigate]);

    return { addSampleAlbum };
};

export default useSampleAlbum;
