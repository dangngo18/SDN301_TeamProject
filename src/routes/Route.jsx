import React from 'react'
import Login from '../pages/Login'
import Home from '../pages/HomePage/Home'
import Style from '../pages/Stylepage/Style'
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
// import AnotherUserProfile from '../pages/AnotherUserProfile/AnotherUserProfile'
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
        path: '/style',
        component: <Style />
    },
    {
        path: '/shop',
        component: <Shop />
    },
    {
        path: '/findemail',
        component: <FindEmail />
    },
    
    {
        path: '/signup',
        component: <SignUp />
    },
      {
        path: '/forgotpass',
        component: <ForgotPass />
    },
    {
        path: '/otp',
        component: <OTP />
    },
    {
        path: '/resetpassword',
        component: <ResetPassword />
    },
    {
        path: '/finnishedreset',
        component: <FinnishedReset />
    },
    {
        path: '/404/notfound',
        component: <NotFound />
    },
    {
        path:'/style/post/:postid',
        component: <PostDetail/>
    },
    {
        path: '/user/profile/:idUser',
        component: <UserProfile/>,
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
        path: '/studio/post/:postId',
        component: <PostEdit/>
    }

]
export { publicRoutes}

