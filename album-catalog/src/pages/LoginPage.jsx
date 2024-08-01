import React, {useContext, useState} from 'react';
import {SessionContext} from '../context/SessionContext.jsx';
import {useNavigate} from "react-router-dom";
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Link} from "@nextui-org/link";
import NavBar from "../components/NavBar.jsx";
import {Spacer} from "@nextui-org/react";


const LoginPage = () => {
    const {logIn} = useContext(SessionContext);
    const [email, setEmail] = useState('redactor@gmail.com');
    const [password, setPassword] = useState('11112222');
    // const [email, setEmail] = useState('visitor@gmail.com');
    // const [password, setPassword] = useState('11112222');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await logIn(email, password);

        if (response.success) {
            navigate('/catalog'); // Redirect to the desired page after successful login
        } else {
            setErrorMessage(response.message);
        }

    };

    return (
        <div className="container md:w-1/2 sm:w-5/6 mx-auto">
            <Spacer y={15}/>
            <h1 className="text-6xl">Login Page</h1>
            <Spacer y={5}/>
            <form onSubmit={handleLogin}>
                <div>


                    <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>
                <Spacer y={5}/>
                <div>

                    <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Spacer y={5}/>
                <Button type="submit" onClick={handleLogin}>Log in</Button>

            </form>
            <Spacer y={5}/>
            <Link href="/signup" size="sm">Don't have an account? Sign up</Link>

            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </div>
    );
};

export default LoginPage;
