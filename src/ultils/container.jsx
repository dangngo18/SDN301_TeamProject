import React, { useEffect } from 'react'
import { Header, HeaderAfterLogin, HeaderforStudio, HeaderforStyle } from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';

export default function Main({ children }) {
    const navPath = location.pathname.split('/')[1].toLowerCase();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    if (token) {
        switch (navPath) {
            case 'studio':
                return (
                    <>
                        <HeaderforStudio />
                        {children}
                    </>
                )
                break;
            case 'style':
                return (
                    <>
                        <HeaderforStyle />
                        {children}
                        <Footer />
                    </>
                )
                break;
            default:
                return (
                    <>
                        <HeaderAfterLogin />
                        {children}
                        <Footer />
                    </>
                )
                break;
        }
    } else {
        switch (navPath) {
            case 'studio' || 'user':
                useEffect(() => {
                    navigate('/login');
                }, [])
                break;
            default:
                return (
                    <>
                        <Header />
                        {children}
                        <Footer />
                    </>
                )
                break;
        }
    }
}
