import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import {NextUIProvider} from "@nextui-org/react";

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <NextUIProvider>
            <main className="light text-foreground bg-background">
                <App />
            </main>
        </NextUIProvider>
    </React.StrictMode>
);