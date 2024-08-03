import React, { useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext.jsx';
import {useNavigate} from "react-router-dom";
import {Spacer} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";
import toast from "react-hot-toast";


const LoginPage = () => {
    const { signUp } = useContext(SessionContext);
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('11112222');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const notify = (msg) => toast(msg);



    const handleRegistration = async (e) => {
        e.preventDefault();

        const response = await signUp(email, password);

        if (response.success) {
            // TODO:- navbar is not updated after registration
            navigate('/login');
            notify('Sign up successfully');
        } else {
            setErrorMessage(response.message);
            notify('Error ocurred while signing up');
        }

    };

    return (
        <>
            <div className="container md:w-1/2 sm:w-5/6 mx-auto">
                <Spacer y={15}/>
                <h1 className="text-6xl">Registration Page</h1>
                <Spacer y={5}/>
                <form onSubmit={handleRegistration}>
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
                    <Button type="submit" onClick={handleRegistration}>Sign up</Button>

                </form>
                <Spacer y={5}/>
                <Link href="/login" size="sm">Already have an account? Log in</Link>

                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            </div>




        </>
    );
};

export default LoginPage;
