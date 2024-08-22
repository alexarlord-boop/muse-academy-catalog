import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import useAlbumStore from "./useAlbumsStore.js";
import useChangePublicState from "./useChangePublicState.js";


const usePublishToggle = (album) => {
    const {filteredAlbums, setFilteredAlbums} = useAlbumStore();
    const {changePublicState, loading, error} = useChangePublicState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        setIsPublic(album?.is_public);
    }, [album]);

    const handlePublishToggle = async () => {
        setIsProcessing(true);
        const newState = !isPublic; // Toggle the current state

        const success = await changePublicState(album.id, newState);
        if (success) {
            // Update the album's public state in the filteredAlbums
            const updatedAlbums = filteredAlbums.map((a) =>
                a.id === album.id ? {...a, is_public: newState} : a
            );
            setFilteredAlbums(updatedAlbums);
            const newAlbums = updatedAlbums.filter((a) => a.id !== album.id);
            setFilteredAlbums(newAlbums);
            setIsPublic(newState);
            // Show a success toast notification
            toast.success(`Album ${newState ? 'published' : 'archived'}`);
        } else {
            // Handle error
            console.error('Failed to change the album public state:', error);
            toast.error('Failed to change the album public state');
        }
        setIsProcessing(false);
    };

    return {handlePublishToggle, isProcessing, isPublic, setIsPublic};
};

export default usePublishToggle;
