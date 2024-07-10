import React, { useEffect } from 'react';
import { Header, HeaderAfterLogin, HeaderforStudio, HeaderforStyle } from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { token } from '../config';


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
                    <>
                        <HeaderforStudio />
                        {children}
                    </>
                );
            case 'style':
                return (
                    <>
                        <HeaderforStyle />
                        {children}
                        <Footer />
                    </>
                );
            case 'user':
                return (
                    <>
                        <HeaderforStyle />
                        {children}
                        <Footer />
                    </>
                );
            default:
                return (
                    <>
                        <HeaderAfterLogin />
                        {children}
                        <Footer />
                    </>
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