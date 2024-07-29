import React from "react";
import NavBar from "./NavBar";
import CustomToast from "./CustomToast.jsx";

const MainLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main className="container mx-auto px-5">{children}</main>
            <CustomToast/>
        </div>
    );
};

export default MainLayout;