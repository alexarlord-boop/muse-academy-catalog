import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/navbar";
import React, {useContext, useEffect} from "react";
import MuseLogo from "./MuseLogo.jsx";

import {Button} from "@nextui-org/button";
import {SessionContext} from "../context/SessionContext.jsx";
import {useNavigate, useLocation} from "react-router-dom";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
// import {Link} from "@nextui-org/link";  -- causing navbar rerender
import {Link} from "react-router-dom";


function NavBar() {
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


    return (
        <Navbar className="" maxWidth="2xl" isBlurred={true} isBordered={true} disableAnimation={false}
                onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <MuseLogo/>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">


                <>
                    <NavbarItem isActive={location.pathname === "/catalog"}>
                        <Link to="/catalog?page=1" aria-current="page">
                            Albums
                        </Link>
                    </NavbarItem>

                    {session?.user ?
                        <NavbarItem isActive={location.pathname === "/favourites"}>
                            <Link to="/favourites" aria-current="page">
                                Favourites
                            </Link>
                        </NavbarItem>
                        :
                        <></>

                    }
                </>


            </NavbarContent>
            <NavbarContent justify="end">

                {session?.user
                    ?
                    <>
                        <NavbarItem>
                            <Button onClick={handleLogout} color="primary" href="#" variant="flat">
                                Log out
                            </Button>
                        </NavbarItem>
                        <Avatar name={session.user.email} isBordered radius="lg"/>
                    </>
                    :
                    <>
                        <NavbarItem>
                            <Link to="/login">Log in</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/signup">Sign up</Link>
                        </NavbarItem>
                    </>
                }


            </NavbarContent>
            <NavbarMenu>
                <>
                    <NavbarItem isActive={location.pathname === "/catalog"}>
                        <Link to="/catalog?page=1" aria-current="page">
                            Albums
                        </Link>
                    </NavbarItem>

                    {session?.user ?
                        <NavbarItem isActive={location.pathname === "/favourites"}>
                            <Link to="/favourites" aria-current="page">
                                Favourites
                            </Link>
                        </NavbarItem>
                        :
                        <></>

                    }
                </>
            </NavbarMenu>
        </Navbar>
    );
}

export default NavBar;