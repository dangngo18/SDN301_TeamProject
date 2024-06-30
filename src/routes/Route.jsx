import React from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Style from '../pages/Style/Style'
import Shop from '../pages/Shop'
import FindEmail from '../pages/ForgotPass/FindEmail'
import PostManage from '../pages/PostManage'
import SignUp from '../pages/SignUp'
import ForgotPass from '../pages/ForgotPass/ForgotPassword'
import OTP from '../pages/ForgotPass/OTP'
import ResetPassword from '../pages/ForgotPass/ResetPassword'
import FinnishedReset from '../pages/ForgotPass/FinnishedReset'
import NotFound from '../pages/NotFound'

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
        component: <PostManage/>
    },
    {
        path: '/SignUp',
        component: <SignUp />
    },
      {
        path: '/ForgotPass',
        component: <ForgotPass />
    },
    {
        path: '/OTP',
        component: <OTP />
    },
    {
        path: '/ResetPassword',
        component: <ResetPassword />
    },
    {
        path: '/FinnishedReset',
        component: <FinnishedReset />
    },
    {
        path: '/Error',
        component: <NotFound />
    }
]

export { publicRoutes }

