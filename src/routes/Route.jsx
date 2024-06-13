import React from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Style from '../pages/Style'
import Shop from '../pages/Shop'

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
    }
]

export { publicRoutes }

