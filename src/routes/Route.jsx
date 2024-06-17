import React from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Style from '../pages/Style'
import Shop from '../pages/Shop'
import FindEmail from '../pages/ForgotPass/FindEmail'
import AddAPost from '../pages/AddAPost'
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
        path: '/post/upload',
        component: <AddAPost/>
    }
]

export { publicRoutes }

