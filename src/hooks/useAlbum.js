import {useState, useEffect} from 'react';


import {supabase} from "../lib/helper/supabaseClient.js";

const useAlbum = (id) => {
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setError('No album ID provided');
            return;
        }

        const fetchAlbum = async () => {
            try {
                const {data, error} = await supabase
                    .from('album')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                setAlbum(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setTimeout(()=>{
                    setLoading(false);
                }, 500)
            }
        };

        fetchAlbum();
    }, [id]);

    return {album, loading, error};
};

export default useAlbum;
