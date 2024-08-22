import { useState } from 'react';
import {supabase} from '../lib/helper/supabaseClient.js';

function useChangePublicState() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const changePublicState = async (albumId, isPublic) => {
        setLoading(true);
        setError(null);

        const { error } = await supabase
            .from('album')
            .update({ is_public: isPublic })
            .eq('id', albumId);

        setLoading(false);

        if (error) {
            setError(error.message);
            return false;
        } else {
            return true;
        }
    };

    return { changePublicState, loading, error };
}

export default useChangePublicState;
