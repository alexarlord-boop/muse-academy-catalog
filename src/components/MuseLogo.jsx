import React from 'react';
import { Image } from '@nextui-org/react';
import logoLightSrc from '../assets/logo-light.svg'; // Light mode logo
import logoDarkSrc from '../assets/logo-dark.svg';  // Dark mode logo

const Logo = () => {

    return (
        <div>
            {/* Light mode logo */}
            <Image
                src={logoDarkSrc}
                alt="Logo"
                width={200}
                height={200}
                className="block dark:hidden" // Show only in light mode
            />
            {/* Dark mode logo */}
            <Image
                src={logoLightSrc}
                alt="Logo"
                width={200}
                height={200}
                className="hidden dark:block" // Show only in dark mode
            />
        </div>
    );
};

export default Logo;