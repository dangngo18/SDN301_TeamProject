import React from 'react'
import { Icon } from './assets/icon/icons';

export const Logo = 'https://i.ibb.co/FH4ZHt0/Logo.png';
export const ShopName = 'Sufy style';
export const ImageUploadAPI = "fedc69815575a27594994dec6f63c535"
export const listMenuProfile=
[
{
    item: "View Profile",
    icon: Icon.Profile,
    url:"/user/profile",
},
{
    item: "Favorites",
    url:"/style/posts/favorites",
    icon: Icon.Save2
},
{
    item: "English",
    url:"",
    function:"changeLanguage",
    icon: Icon.Locate
},
{
    item: "Settings",
    url:"/user/settings",
    icon: Icon.Setting
},
{
    item: "Help",
    url:"/pages/help",
    icon: Icon.Question
},
{
    item: "Night mode",
    url:"",
    function:"changeTheme",
    icon: Icon.Night
},
]