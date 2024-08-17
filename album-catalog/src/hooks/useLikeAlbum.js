import { useState } from 'react';
import toast from 'react-hot-toast'; // For notifications or feedback
import {supabase} from "../lib/helper/supabaseClient.js";

const useLikeAlbum = (albumId, initialLikedStatus = false) => {
    const [isLiked, setIsLiked] = useState(initialLikedStatus);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleLike = async (userId) => {
        setLoading(true);
        setError(null);

        try {
            if (isLiked) {
                // If the album is already liked, remove it from the user's favorites
                const { error } = await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', userId)
                    .eq('album_id', albumId);

                if (error) {
                    throw error;
                }

                setIsLiked(false);
                toast('Album removed from favorites');
            } else {
                // If the album is not liked, add it to the user's favorites
                const { error } = await supabase
                    .from('favorites')
                    .insert([{ user_id: userId, album_id: albumId }]);

                if (error) {
                    throw error;
                }

                setIsLiked(true);
                toast.success('Album added to favorites');
            }
        } catch (err) {
            setError(err.message);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        isLiked,
        toggleLike,
        loading,
        error,
    };
};

export default useLikeAlbum;
