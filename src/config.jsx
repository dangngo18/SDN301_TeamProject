import { Icon } from './assets/icon/icons';

export const Logo = 'https://i.ibb.co/FH4ZHt0/Logo.png';
export const ShopName = 'Sufy style';
export const Menu = ["Home", "Style", "Shop"]
export const ImageUploadAPI = "fedc69815575a27594994dec6f63c535"
export const token = localStorage.getItem('token');
export const API = "http://localhost:8080"
export const LocalWebsite = "http://localhost:5173"
export const listMenuProfile=
[
{
    item: "View Profile",
    icon: Icon.Profile,
    url:`/user/profile/${localStorage.getItem('userId')}`,
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
if(token){
  
}
export const Mainstyle_tabbar_Item = token ?
[
    {
      id:1,  
      title:"For you",
      function:1,
      icon: Icon.Home
    },
    {
      id:2,  
      title:"Following",
      function:2,
      icon: Icon.Following
    },
    {
      id:3,  
      title:"Friend",
      function:3,
      icon: Icon.Friend
    },
    {
      id:4,  
      title:"Trending",
      function:4,
      icon: Icon.Trending
    },
    {
      id:5,  
      title:"Clothes",
      function:5,
      icon: Icon.Clothes
    },
    {
      id:6,  
      title:"Bag",
      function:6,
      icon: Icon.Bag
    },
    {
      id:7,  
      title:"Accessory",
      function:7,
      icon: Icon.Accessory
    },
    
]:
[
  {
    id:1,  
    title:"For you",
    function:1,
    icon: Icon.Home
  },
  {
    id:4,  
    title:"Trending",
    function:4,
    icon: Icon.Trending
  },
  {
    id:5,  
    title:"Clothes",
    function:5,
    icon: Icon.Clothes
  },
  {
    id:6,  
    title:"Bag",
    function:6,
    icon: Icon.Bag
  },
  {
    id:7,  
    title:"Accessory",
    function:7,
    icon: Icon.Accessory
  },
  
]