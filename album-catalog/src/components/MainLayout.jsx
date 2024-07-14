import React from "react";
import NavBar from "./NavBar";

const MainLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main className="container mx-auto px-5">{children}</main>
        </div>
    );
};

export default MainLayout;