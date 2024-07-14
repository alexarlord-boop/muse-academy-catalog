import React, {useContext, useState} from 'react';
import {SessionContext} from '../context/SessionContext.jsx';
import {useNavigate} from "react-router-dom";
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Link} from "@nextui-org/link";
import NavBar from "../components/NavBar.jsx";


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
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>

                    <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>
                <div>
                    <label>Password</label>
                    <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" onClick={handleLogin}>Log in</Button>

            </form>
            <Link href="/signup" size="sm">Don't have an account? Sign up</Link>

            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </>
    );
};

export default LoginPage;
