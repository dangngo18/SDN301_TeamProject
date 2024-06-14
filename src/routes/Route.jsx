import React from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Style from '../pages/Style'
import Shop from '../pages/Shop'
import FindEmail from '../pages/ForgotPass/FindEmail'
import ForgotPass from '../pages/ForgotPass/ForgotPassword'
import OTP from '../pages/ForgotPass/OTP'
const publicRoutes = [
    {
        path: '/',
        component: <Home />
    },
    {
        path: '/login',
        component: <Login />
    },
    {
        path: '/register',
        component: <Register />
    },
    {
        path: '/Style',
        component: <Style />
    },
    {
        path: '/Shop',
        component: <Shop />
    },
    {
        path: '/FindEmail',
        component: <FindEmail />
    },
    {
        path: '/ForgotPass',
        component: <ForgotPass />
    },
    {
        path: '/OTP',
        component: <OTP />
    },
]

export { publicRoutes }

