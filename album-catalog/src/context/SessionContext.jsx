import React, {createContext, useEffect, useState} from "react";

import {supabase} from "../lib/helper/supabaseClient.js";

export const SessionContext = createContext();

export const SessionProvider = ({children}) => {



    const [session, setSession] = useState(null);
    const [role, setRole] = useState(null);
    const [page, setPage] = useState(0);


    useEffect(() => {
        fetchSession();
    }, []);

    useEffect(() => {
        if (session?.user) {
            getRole(session.user.id);
        }
    }, [session]);



    const fetchSession = async () => {
        try {
            const {data, error} = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error);
            } else {
                setSession(data.session);
                console.log('Current session:', data.session);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const getRole = async (userId) => {
        try {
            const {data, error} = await supabase
                .from('user_role')
                .select('role_name')
                .eq('user_id', userId)
                .single();
            if (error) {
                setRole(null);
                console.error('Error fetching user role:', error);
            } else {
                console.log('User role:', data.role_name);
                setRole(data.role_name);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const signUp = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.error('Error signing up:', error);
                return { success: false, message: error.message };
            } else {
                console.log('Signed up successfully:', data);
                setSession(data.session);
                return { success: true, message: 'Signed up successfully' };
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            return { success: false, message: 'Unexpected error occurred' };
        }
    };

    const logIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Error signing in:', error);
                return { success: false, message: error.message };
            } else {
                console.log('Signed in successfully:', data);
                setSession(data.session);
                return { success: true, message: 'Signed in successfully' };
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            return { success: false, message: 'Unexpected error occurred' };
        }
    };

    const logOut = async () => {
        try {
            const {error} = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out:', error);
            } else {
                console.log('Signed out successfully');
                setSession(null);
                setRole(null);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    return (
        <SessionContext.Provider value={{session, role, signUp, logIn, logOut}}>
            {children}
        </SessionContext.Provider>
    );
};
