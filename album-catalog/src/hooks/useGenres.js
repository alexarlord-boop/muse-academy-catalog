import { useState, useEffect } from 'react';
import { supabase } from "../lib/helper/supabaseClient.js";

const useGenres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data, error } = await supabase
                    .from('album_genre') // Replace with your genres table name
                    .select();

                if (error) throw error;
                setGenres(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return { genres, loading, error };
};

export default useGenres;
