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
import {Avatar} from "@nextui-org/avatar";
import {Link} from "react-router-dom";
import useCatalog from "../hooks/useCatalog.js";
import SearchInput from "./SearchInput.jsx";
import FilterModal from "./FilterModal.jsx";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {FaCubesStacked, FaFilter} from "react-icons/fa6";
import {FaCube, FaPlus} from "react-icons/fa";
import useSampleAlbum from "../hooks/useSampleAlbum.js";
import {BsGrid} from "react-icons/bs";
import MediaQuery from "./MediaQuery.jsx";


const NavBar = () => {
    const {session, role} = useContext(SessionContext);
    const {logOut} = useContext(SessionContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logOut();
        navigate("/login")
    };

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

    return (
        <Navbar className="py-2 px-4" maxWidth="2xl" isBlurred={true} isBordered={true} disableanimation={false}
                onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/catalog")}>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand className="ml-2">
                        <MuseLogo/>
                    </NavbarBrand>
                </div>
                <MediaQuery min="md">
                    <NavbarContent>

                        <Button variant="bordered" onClick={() => navigate("/catalog")}>
                            <BsGrid/>
                        </Button>

                    </NavbarContent>
                    <NavbarContent as="div" className="">

                        <ButtonGroup>
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
                        </ButtonGroup>


                    </NavbarContent>
                    <NavbarContent>

                        <Button className="" variant="bordered" onClick={() => addSampleAlbum()}>
                            <FaPlus/>
                        </Button>
                    </NavbarContent>
                </MediaQuery>


                {session?.user
                    ? <NavbarContent as="div" justify="end">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    name="Jason Hughes"
                                    size="sm"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{session.user.email}</p>
                                </DropdownItem>
                                <DropdownItem key="favourites" onClick={() => navigate("/favourites")}>My
                                    Favourites</DropdownItem>
                                <DropdownItem key="settings">My Settings</DropdownItem>
                                <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                    : <NavbarContent as="div" justify="end">
                        <NavbarItem>
                            <Link to="/login">Log in</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/signup">Sign up</Link>
                        </NavbarItem>
                    </NavbarContent>
                }

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
