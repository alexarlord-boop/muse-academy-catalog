import React from 'react';
import { Image } from '@nextui-org/react';
import logoSrc from '../assets/Muse_Group_logo.svg';
import {useNavigate} from "react-router-dom"; // Adjust the path based on your project structure

const Logo = () => {
    const navigate = useNavigate();

    return (
        <Image
            src={logoSrc}
            alt="Logo"
            width={200}
            height={200}
        />
    );
};

export default Logo;