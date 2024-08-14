import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from "../lib/helper/supabaseClient.js";
import toast from "react-hot-toast";


export const useDeleteRecord = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const notify = (msg) => toast(msg);

    const deleteRecord = async (table, column, id, redirectPath = null) => {
        setLoading(true);
        const { data, error } = await supabase
            .from(table)
            .delete()
            .eq(column, id)
            .select();

        setLoading(false);

        if (error) {
            console.error(`Error deleting ${table} from ${table}:`, error);
            setError(error);
            notify(`Failed to delete ${table}`);
        } else {
            const capitalized =
                table.charAt(0).toUpperCase()
                + table.slice(1)
            if (redirectPath) navigate(redirectPath);
            console.log(`${capitalized} deleted successfully from ${table}:`, data);
            notify(`${capitalized} deleted successfully`);
        }
    };

    return { deleteRecord, loading, error };
};
