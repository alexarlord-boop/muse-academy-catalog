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
import SearchInput from "./SearchInput.jsx";
import FilterModal from "./FilterModal.jsx";

import MediaQuery from "./MediaQuery.jsx";
import UserProfile from "./UserProfile.jsx";


const NavBar = ({
                    handleSearchChange,
                    searchTerm,
                    updateURL,
                    genre,
                    setGenre,
                    format,
                    setFormat,
                }) => {
    const navigate = useNavigate();
    const {session, role} = useContext(SessionContext);
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const goHome = () => {
        navigate("/catalog/?page=1");
        navigate(0);
    }

    const pathsToExclude = ['/login', '/signup', '/favorites', '/unpublished'];
    return (
        <Navbar shouldHideOnScroll className="py-0 px-4" maxWidth="full" isBlurred={true} isBordered={true}
                onMenuOpenChange={setIsMenuOpen}>

                <MediaQuery min="md">
                    <div className="cursor-pointer" onClick={goHome}><MuseLogo/></div>
                    {!pathsToExclude.includes(location.pathname) &&
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
                    }

                </MediaQuery>

                <UserProfile/>

            <NavbarMenu>
                <NavbarItem isActive={location.pathname === "/catalog"}>
                    <Link to="/catalog?page=1" aria-current="page">Albums</Link>
                </NavbarItem>

                {session?.user &&
                    <NavbarItem isActive={location.pathname === "/favorites"}>
                        <Link to="/favorites" aria-current="page">Favorites</Link>
                    </NavbarItem>
                }
            </NavbarMenu>
        </Navbar>
    );
}

export default NavBar;
