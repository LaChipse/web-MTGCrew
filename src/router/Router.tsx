import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import * as ROUTES from './routes'

const AuthPage = React.lazy(() => import('../pages/Auth/Auth'));
const HomePage = React.lazy(() => import('../pages/Home/Home'));
const ProfilPage = React.lazy(() => import('../pages/Profil/Profil'));
const DecksPage = React.lazy(() => import('../pages/Decks/Decks'));
const GamesPage = React.lazy(() => import('../pages/Games/Games'));
const Login = React.lazy(() => import('../pages/Auth/Login/Login'));
const Signup = React.lazy(() => import('../pages/Auth/Signup/Signup'));

const AuthLayout = React.lazy(() => import('../Layouts/Auth/AuthLayout'));
const ThemeLayout = React.lazy(() => import('../Layouts/Theme/ThemeLayout'));
const ThemeAuthLayout = React.lazy(() => import('../Layouts/Theme/ThemeAuthLayout'));
const PagePathStorageLayout = React.lazy(() => import('../Layouts/PagePathStorage/PagePathStorage'));


const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<ThemeAuthLayout />}>
                <Route path={ROUTES.LOGIN_PAGE} element={<Login />} />
                <Route path={ROUTES.SIGNUP_PAGE} element={<Signup />} />
            </Route>

            <Route element={<ThemeLayout />}>
                <Route path={ROUTES.AUTH_PATH} element={<AuthPage />} />
                    <Route element={<AuthLayout />}>
                        <Route path={ROUTES.HOME_PATH} element={<HomePage />} />
                        <Route element={<PagePathStorageLayout />}>
                            <Route path={ROUTES.PROFIL_PAGE} element={<ProfilPage />} />
                            <Route path={ROUTES.DECKS_PAGE} element={<DecksPage />} />
                            <Route path={ROUTES.GAMES_PAGE} element={<GamesPage />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to={ROUTES.HOME_PATH} replace />} />
        </Routes>
    </BrowserRouter>
);

export default Router;