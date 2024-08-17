import {NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {SessionContext} from "../context/SessionContext.jsx";
import {CiDark, CiHeart} from "react-icons/ci";
import {HiOutlineCog8Tooth} from "react-icons/hi2";
import {HeartIcon} from "./icons/HeartIcon.jsx";


const UserProfile = () => {
    const {session, role} = useContext(SessionContext);
    const {logOut} = useContext(SessionContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isLiked = location.pathname.includes("/favourites");

    const handleLogout = async (e) => {
        e.preventDefault();
        await logOut();
        // navigate("/login")
    };

    const handleSwitch = () => {
        navigate(isLiked ? "/catalog" : "/favourites" );
    }

    return (

        session?.user
            ?
            <>
                <NavbarContent as="div" justify="end">
                    <HeartIcon size={30}
                               className={isLiked ? "[&>path]:stroke-transparent" : ""}
                               fill={isLiked ? "red" : "none"}
                               onClick={handleSwitch}
                               style={{cursor: "pointer"}}
                    />
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
                            <DropdownItem startContent={<CiDark/>}>
                                Toggle theme
                            </DropdownItem>
                            <DropdownItem key="settings" startContent={<HiOutlineCog8Tooth/>}>My Settings</DropdownItem>
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