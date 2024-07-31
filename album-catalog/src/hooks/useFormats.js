import { useState, useEffect } from 'react';
import { supabase } from "../lib/helper/supabaseClient.js";

const useFormats = () => {
    const [formats, setFormats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormats = async () => {
            try {
                const { data, error } = await supabase
                    .from('album_format') // Replace with your formats table name
                    .select();

                if (error) throw error;
                setFormats(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFormats();
    }, []);

    return { formats, loading, error };
};

export default useFormats;
