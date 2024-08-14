import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from "../lib/helper/supabaseClient.js";
import toast from "react-hot-toast";


// Custom hook to delete a record
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
            console.error(`Error deleting record from ${table}:`, error);
            setError(error);
            notify("Failed to delete record");
        } else {
            if (redirectPath) navigate(redirectPath);
            console.log(`Record deleted successfully from ${table}:`, data);
            notify("Record deleted successfully");
        }
    };

    return { deleteRecord, loading, error };
};
