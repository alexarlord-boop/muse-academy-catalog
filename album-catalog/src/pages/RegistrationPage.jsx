import React, { useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext.jsx';
import {useNavigate} from "react-router-dom";
import NavBar from "../components/NavBar.jsx";


const LoginPage = () => {
    const { signUpWithEmail } = useContext(SessionContext);
    // const [email, setEmail] = useState('redactor@gmail.com');
    // const [password, setPassword] = useState('11112222');
    const [email, setEmail] = useState('visitor@gmail.com');
    const [password, setPassword] = useState('11112222');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleRegistration = async (e) => {
        e.preventDefault();
        const response = await signUpWithEmail(email, password);

        if (response.success) {
            navigate('/login'); // Redirect to the desired page after successful registration
        } else {
            setErrorMessage(response.message);
        }

    };

    return (
        <>
            <h1>Registration Page</h1>
            <form onSubmit={handleRegistration}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>
            <a href={'/login'}>Sign in</a>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </>
    );
};

export default LoginPage;
