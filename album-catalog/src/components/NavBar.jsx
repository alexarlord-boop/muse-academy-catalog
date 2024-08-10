import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu
} from "@nextui-org/navbar";
import React, {useContext} from "react";
import MuseLogo from "./MuseLogo.jsx";
import {Button, ButtonGroup} from "@nextui-org/button";
import {SessionContext} from "../context/SessionContext.jsx";
import {useNavigate, useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import useCatalog from "../hooks/useCatalog.js";
import SearchInput from "./SearchInput.jsx";
import FilterModal from "./FilterModal.jsx";

import {FaPlus} from "react-icons/fa";
import useSampleAlbum from "../hooks/useSampleAlbum.js";
import MediaQuery from "./MediaQuery.jsx";
import UserProfile from "./UserProfile.jsx";


const NavBar = () => {
    const {session, role} = useContext(SessionContext);
    const navigate = useNavigate();
    const location = useLocation();


    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {
        handleSearchChange,
        searchTerm,
        updateURL,
        genre,
        setGenre,
        format,
        setFormat,
    } = useCatalog();

    const {addSampleAlbum} = useSampleAlbum();
    const pathsToExclude = ['/login', '/signup'];
    return (
        <Navbar className="py-2 px-4" maxWidth="2xl" isBlurred={true} isBordered={true}
                onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>

                <MediaQuery min="md">
                    <NavbarBrand className="cursor-pointer " onClick={() => {navigate("/catalog?page=1");}}>
                        <MuseLogo/>
                    </NavbarBrand>

                    {!pathsToExclude.includes(location.pathname) &&
                        <>
                            <NavbarContent className=""></NavbarContent>
                            <NavbarContent className="">

                                    <SearchInput
                                        searchTerm={searchTerm}
                                        onSearchChange={handleSearchChange}
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
                            <NavbarContent>
                                {
                                    session?.user && role === "REDACTOR" &&
                                    <Button className="" variant="bordered" color="danger" isIconOnly={true} onClick={() => addSampleAlbum()}>
                                        <FaPlus/>
                                    </Button>

                                }
                            </NavbarContent>
                        </>
                    }
                </MediaQuery>


                <UserProfile/>


            </NavbarContent>
            <NavbarMenu>
                <NavbarItem isActive={location.pathname === "/catalog"}>
                    <Link to="/catalog?page=1" aria-current="page">
                        Albums
                    </Link>
                </NavbarItem>

                {session?.user &&
                    <NavbarItem isActive={location.pathname === "/favourites"}>
                        <Link to="/favourites" aria-current="page">
                            Favourites
                        </Link>
                    </NavbarItem>
                }
            </NavbarMenu>
        </Navbar>
    );
}

export default NavBar;
