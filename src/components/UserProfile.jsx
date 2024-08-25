import {NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {SessionContext} from "../context/SessionContext.jsx";
import {CiCirclePlus, CiDark, CiHeart, CiLight, CiPen, CiSquarePlus} from "react-icons/ci";
import {HeartIcon} from "./icons/HeartIcon.jsx";
import useSampleAlbum from "../hooks/useSampleAlbum.js";
import {useTheme} from "next-themes";


const UserProfile = () => {
    const {session, role} = useContext(SessionContext);
    const {logOut} = useContext(SessionContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isLiked = location.pathname.includes("/favorites");
    const {theme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await logOut();
    };

    const handleSwitch = () => {
        navigate(isLiked ? "/catalog" : "/favorites");
        navigate(0);
    }

    const goToModeration = () => {
        navigate("/unpublished?page=1");
        navigate(0);
    }

    const {addSampleAlbum} = useSampleAlbum();

    return (

        session?.user
            ?
            <>
                <NavbarContent as="div" justify="" className="float-end">
                    <NavbarItem className="text-red-600 hover:bg-red-200 rounded-full p-1">
                        <HeartIcon size={30}
                                   className={isLiked ? "[&>path]:stroke-transparent" : ""}
                                   fill={isLiked ? "red" : "none"}
                                   onClick={handleSwitch}
                                   style={{cursor: "pointer"}}
                        />
                    </NavbarItem>
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
                                <p className="font-semibold">{session.user.email}</p>
                            </DropdownItem>
                            {
                                session?.user && role === 'REDACTOR' &&
                                <DropdownItem startContent={<CiPen/>}>
                                    <Link onClick={goToModeration}><p>Moderation</p></Link>
                                </DropdownItem>
                            }
                            {
                                session?.user && role === 'REDACTOR' &&
                                <DropdownItem startContent={<CiSquarePlus/>}>
                                    <Link onClick={addSampleAlbum}><p>Add album</p></Link>
                                </DropdownItem>
                            }

                            <DropdownItem startContent={theme === 'light' ? <CiDark size={20}/> : <CiLight size={20}/>}>
                                <p
                                    onClick={toggleTheme}
                                >
                                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                                </p>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </>
            : <NavbarContent as="div" justify="end">
                <NavbarItem>
                    <Link to="/login">Log in</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/signup">Sign up</Link>
                </NavbarItem>
            </NavbarContent>


    );
}

export default UserProfile