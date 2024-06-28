import React from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/HomePage/Home'
import Style from '../pages/Style'
import Shop from '../pages/Shop'
import FindEmail from '../pages/ForgotPass/FindEmail'
import PostUpload from '../pages/Studio/PostUpload'
import PostManage from '../pages/Studio/PostManage'
import PostEdit from '../pages/Studio/PostEdit'
import SignUp from '../pages/SignUp'
import ForgotPass from '../pages/ForgotPass/ForgotPassword'
import OTP from '../pages/ForgotPass/OTP'
import ResetPassword from '../pages/ForgotPass/ResetPassword'
import FinnishedReset from '../pages/ForgotPass/FinnishedReset'
import NotFound from '../pages/NotFound'
import PostDetail from '../pages/PostDetail/PostDetail'
import AnotherUserProfile from '../pages/AnotherUserProfile/AnotherUserProfile'
import UserProfile from '../pages/User/UserProfile'

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
        path: '/studio/posts',
        component: <PostManage/>
    },
    {
        path: '/studio/post/upload',
        component: <PostUpload/>
    },
    {
        path: '/studio/post/:id',
        component: <PostEdit/>
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
    },
    {
        path:'/style/post/:postid',
        component: <PostDetail/>
    },
    {
        path:'/User/:userid',
        component: <AnotherUserProfile/>
    },
    {
        path: '/user/profile/:idUser',
        component: <UserProfile/>,
    }
]

export { publicRoutes }

