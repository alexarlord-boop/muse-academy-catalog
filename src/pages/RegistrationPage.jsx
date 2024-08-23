import React, { useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext.jsx';
import { useNavigate } from "react-router-dom";
import { Spacer } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import toast from "react-hot-toast";

// Common validation functions
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password.length >= 8; // Example: password should be at least 8 characters
};

const RegistrationPage = () => {
    const { signUp } = useContext(SessionContext);
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('11112222');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        // Clear any previous error messages
        setErrorMessage('');

        const response = await signUp(email, password);

        if (response.success) {
            navigate('/catalog');
            navigate(0); // Refresh page
        } else {
            setErrorMessage(response.message);
            toast.error('Error occurred while signing up');
        }
    };

    return (
        <div className="container md:w-1/2 sm:w-5/6 mx-auto">
            <Spacer y={15} />
            <h1 className="text-4xl">Sign up</h1>
            <Spacer y={5} />
            <form onSubmit={handleRegistration}>
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
                        // Show error if password is too short
                        helperText={!validatePassword(password) && password ? 'Password must be at least 8 characters' : ''}
                        status={!validatePassword(password) && password ? 'error' : 'default'}
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <Spacer y={5} />
                <Button type="submit">Sign up</Button>
            </form>
            <Spacer y={5} />
            <Link href="/login" size="sm">Already have an account? Log in</Link>
        </div>
    );
};

export default RegistrationPage;
