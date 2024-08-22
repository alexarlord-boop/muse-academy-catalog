import React from 'react';
import LoginPage from "./pages/LoginPage.jsx";
import {SessionProvider} from "./context/SessionContext.jsx";
import {NextUIProvider} from '@nextui-org/react'
import {createBrowserRouter, RouterProvider, useNavigate,} from "react-router-dom";
import CatalogPage from "./pages/CatalogPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import IntroPage from "./pages/IntroPage.jsx";
import FavouritesPage from "./pages/FavouritesPage.jsx";
import MainLayout from "./components/MainLayout.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";
import AlbumEditPage from "./pages/AlbumEditPage.jsx";
import UnpublishedPage from "./pages/UnpublishedPage.jsx";

export default function App() {

    // TODO:- add breadcrumbs for pages (except catalog)
    // TODO:- dark theme styles? -- via css (for not rerender)
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout><IntroPage/></MainLayout>
        },
        {
            path: "/catalog",
            element: <MainLayout><CatalogPage/></MainLayout>
        },
        {
            path: "/catalog/:id",
            element: <MainLayout><AlbumPage/></MainLayout>
        },
        {
            path: "/catalog/edit/:id",
            element: <MainLayout><AlbumEditPage/></MainLayout>
        },
        {
            path: "/favourites",
            element: <MainLayout><FavouritesPage/></MainLayout>
        },
        {
            path: "/unpublished",
            element: <MainLayout><UnpublishedPage/></MainLayout>
        },
        {
            path: "/login",
            element: <MainLayout><LoginPage/></MainLayout>
        },
        {
            path: "/signup",
            element: <MainLayout><RegistrationPage/></MainLayout>
        },
    ]);

    return (
        <NextUIProvider>
            <SessionProvider>

                <RouterProvider router={router}>
                </RouterProvider>
            </SessionProvider>
        </NextUIProvider>
    );
}
