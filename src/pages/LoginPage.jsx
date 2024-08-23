import React, { useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext.jsx';
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Spacer } from "@nextui-org/react";
import toast from "react-hot-toast";

const LoginPage = () => {
    const { logIn } = useContext(SessionContext);
    const [email, setEmail] = useState('visitor@gmail.com');
    const [password, setPassword] = useState('11112222');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Validation function for email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validation function for password (optional: can include more checks)
    const validatePassword = (password) => {
        return password.length > 0; // Ensures password is not empty
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('Password cannot be empty.');
            return;
        }

        // Clear any previous error messages
        setErrorMessage('');

        const response = await logIn(email, password);

        if (response.success) {
            navigate('/catalog'); // Redirect to the desired page after successful login
        } else {
            setErrorMessage(response.message);
            toast.error('Error occurred while logging in');
        }
    };

    return (
        <div className="container md:w-1/2 sm:w-5/6 mx-auto">
            <Spacer y={15} />
            <h1 className="text-4xl">Log in</h1>
            <Spacer y={5} />
            <form onSubmit={handleLogin}>
                <div>
                    <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        // Show error if email is not valid
                        helperText={!validateEmail(email) && email ? 'Invalid email format' : ''}
                        status={!validateEmail(email) && email ? 'error' : 'default'}
                    />
                </div>
                <Spacer y={5} />
                <div>
                    <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        // Show error if password is empty
                        helperText={!validatePassword(password) && password ? 'Password is required' : ''}
                        status={!validatePassword(password) && password ? 'error' : 'default'}
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <Spacer y={5} />
                <Button type="submit">Log in</Button>
            </form>
            <Spacer y={5} />
            <Link href="/signup" size="sm">Don't have an account? Sign up</Link>
        </div>
    );
};

export default LoginPage;
