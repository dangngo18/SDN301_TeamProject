import React, { useEffect, useContext } from 'react';
import { Header, HeaderAfterLogin, HeaderforStudio, HeaderforStyle } from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { token } from '../config';
import { SessionProvider } from '../Context';

export default function Main({ children }) {
    const navPath = location.pathname.split('/')[1].toLowerCase();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token && (navPath === 'studio')) {
            navigate('/login');
        }
    }, [navPath, navigate, token]);

    if (token) {
        switch (navPath) {
            case 'studio':
                return (
                    <SessionProvider>
                        <HeaderforStudio />
                        {children}
                    </SessionProvider>
                );
            case 'style':
                return (
                    <SessionProvider>
                        <HeaderforStyle />
                        {children}
                        <Footer />
                    </SessionProvider>
                );
            default:
                return (
                    <SessionProvider>
                        <HeaderAfterLogin />
                        {children}
                        <Footer />
                    </SessionProvider>
                );
        }
    } else {
        if (navPath === 'studio') {
            return null; // Navigation to /login handled in useEffect
        } else {
            return (
                <>
                    <Header />
                    {children}
                    <Footer />
                </>
            );
        }
    }
}