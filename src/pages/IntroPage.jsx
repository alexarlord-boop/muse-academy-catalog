import React from 'react';
import {Button} from "@nextui-org/button";
import {useNavigate} from "react-router-dom";

const IntroPage = () => {
    const navigate = useNavigate();
    return <div className="container h-screen text-center my-auto ">
        <h1 className="text-3xl lg:text-6xl">Frontend Academy</h1>
        <p>landing page for the project...</p>
       <Button onClick={() => navigate('/login')}>Explore Albums</Button>
    </div>
}

export default IntroPage;