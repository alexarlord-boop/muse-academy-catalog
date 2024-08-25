import React from "react";


export default function Footer() {
    const year = new Date().getFullYear();
    // TODO:- add links and readme
    return (
        <footer className=" bg-white rounded-lg shadow m-4 dark:bg-black">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © {year} <a
                    href="https://github.com/alexarlord-boop"
                    className="hover:underline">Aleksandr Petrunin™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://github.com/alexarlord-boop/muse-academy-catalog/blob/main/README.md#screenshots" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">LinkedIn</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>

    );
}