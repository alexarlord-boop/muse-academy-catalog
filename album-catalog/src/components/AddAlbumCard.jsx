import React from 'react';
import { Card } from '@nextui-org/react';
import {PiMusicNotesPlus} from "react-icons/pi"; // Ensure you have this icon installed or use an alternative

const AddAlbumCard = ({ onAddSampleAlbum }) => {
    return (
        <Card
            isPressable
            isHoverable
            onClick={onAddSampleAlbum}
            className="flex justify-center items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            <div className="flex flex-col items-center p-4">
                <PiMusicNotesPlus className="w-12 h-12 text-gray-500 dark:text-gray-300" />

                <h1 className="mt-2 text-lg font-medium">Add New Album</h1>
            </div>
        </Card>
    );
};

export default AddAlbumCard;
