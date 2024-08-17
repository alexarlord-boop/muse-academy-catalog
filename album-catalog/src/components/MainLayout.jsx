import React from "react";
import NavBar from "./NavBar";
import CustomToast from "./CustomToast.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";

const MainLayout = ({ children }) => {
    return (
        <div>
            {/*TODO:- add loader*/}
            <NavBar />
            <main className="container mx-auto px-5">{children}</main>
            <CustomToast/>
            <ConfirmationModal/>  {/* deletion, publishing */}
        </div>
    );
};

export default MainLayout;