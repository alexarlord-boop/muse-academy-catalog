import {
    Navbar,
    NavbarContent,
    NavbarItem,
    NavbarMenu
} from "@nextui-org/navbar";
import React, {useContext} from "react";
import MuseLogo from "./MuseLogo.jsx";
import {SessionContext} from "../context/SessionContext.jsx";
import {useNavigate, useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import useCatalog from "../hooks/useCatalog.js";
import SearchInput from "./SearchInput.jsx";
import FilterModal from "./FilterModal.jsx";

import MediaQuery from "./MediaQuery.jsx";
import UserProfile from "./UserProfile.jsx";
import AddButton from "./AddButton.jsx";


const NavBar = ({
                    handleSearchChange,
                    searchTerm,
                    updateURL,
                    genre,
                    setGenre,
                    format,
                    setFormat,
                }) => {
    const {session, role} = useContext(SessionContext);
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    const pathsToExclude = ['/login', '/signup', '/favourites'];
    return (
        <Navbar className="py-0 px-4" maxWidth="full" isBlurred={true} isBordered={true}
                onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>

                <MediaQuery min="md">

                    <Link to="/catalog/?page=1"><MuseLogo/></Link>

                    {!pathsToExclude.includes(location.pathname) &&
                        <>
                            <NavbarContent></NavbarContent>
                            <NavbarContent>
                                <SearchInput
                                    searchTerm={searchTerm}
                                    handleSearchChange={handleSearchChange}
                                    updateURL={updateURL}
                                    genre={genre}
                                    format={format}
                                />
                                <FilterModal
                                    genre={genre}
                                    setGenre={setGenre}
                                    format={format}
                                    setFormat={setFormat}
                                    onApplyFilters={(genre, format) => updateURL(searchTerm, genre, format, 1)}
                                    onClearFilters={() => updateURL(searchTerm, null, null, 1)}
                                />
                            </NavbarContent>

                            <NavbarContent><AddButton/></NavbarContent>
                        </>
                    }

                </MediaQuery>

                <UserProfile/>

            </NavbarContent>
            <NavbarMenu>
                <NavbarItem isActive={location.pathname === "/catalog"}>
                    <Link to="/catalog?page=1" aria-current="page">Albums</Link>
                </NavbarItem>

                {session?.user &&
                    <NavbarItem isActive={location.pathname === "/favourites"}>
                        <Link to="/favourites" aria-current="page">Favourites</Link>
                    </NavbarItem>
                }
            </NavbarMenu>
        </Navbar>
    );
}

export default NavBar;
