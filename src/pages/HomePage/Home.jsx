import React from 'react';
import { Header, HeaderAfterLogin } from '../../components/Header';
import Footer from '../../components/Footer';
import { Icon } from '../../assets/icon/icons';
import HomeBanner from './HomeBanner';
import '../../../src/assets/styles/homestyle.scss';
import Category from './Category';
import ProductCard from '../../components/ProductCard';
import { ProductList1 } from './ProductList1';
import MediaList from './MediaList';
import Productlist2 from './Productlist2';
import ProductList3 from './ProductList3';

export default function Home() {
    const [menuItems, setMenuItems] = React.useState([
        { text: 'Suggest', icon: Icon.House, select: true },
        { text: 'Trending', icon: Icon.UserPlus, select: false },
        { text: 'Luxury', icon: Icon.UserGroup, select: false },
        { text: 'Discover', icon: Icon.Compass, select: false },
        { text: 'Men', icon: Icon.Shirt, select: false },
        { text: 'Women', icon: Icon.Bag, select: false },
        { text: 'Events', icon: Icon.Glass, select: false },
    ]);

    const [isLogin, setIsLogin] = React.useState(false);
    const [category, setCategory] = React.useState([
        [
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 1',
            },
        ],
        [
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
            {
                placeholder: './img/Logo.jpg',
                category: 'Category 2',
            },
        ]
    ])
    const products = [
        {
            "id": 1,
            "name": "Supreme",
            "description": "Supreme x Ducati Soccer Jersey Black - 24SS",
            "price": "400.000 vnd",
            "image": "https://i.ibb.co/qJKDRZX/Rectangle-10.png"
        },
        {
            "id": 2,
            "name": "Supreme",
            "description": "Supreme x Ducati Soccer Jersey Black - 24SS",
            "price": "400.000 vnd",
            "image": "https://i.ibb.co/5Txnt03/Rectangle-10-1.png"
        },
        {
            "id": 3,
            "name": "Supreme",
            "description": "Supreme x Ducati Soccer Jersey Black - 24SS",
            "price": "400.000 vnd",
            "image": "https://i.ibb.co/DKYwzNq/Rectangle-10-2.png"
        },
        {
            "id": 4,
            "name": "Supreme",
            "description": "Supreme x Ducati Soccer Jersey Black - 24SS",
            "price": "400.000 vnd",
            "image": "https://i.ibb.co/Sv0cRvN/Rectangle-10-3.png"
        },
        {
            "id": 5,
            "name": "Supreme",
            "description": "Supreme x Ducati Soccer Jersey Black - 24SS",
            "price": "400.000 vnd",
            "image": "https://i.ibb.co/wCt6gMw/Rectangle-10-4.png"
        },
    ]
    const media = [
        {
            "id": 1,
            "username": "@h_dang",
            "image": "public/img/Rectangle 12.png",
            "profileimg":"public/img/OIP.png"
            
        },
        {
            "id": 2,
            "username": "@h_dang",
            "image": "public/img/Rectangle 12.png",
            "profileimg":"public/img/OIP.png"
        },
        {
            "id": 3,
            "username": "@h_dang",
            "image": "public/img/Rectangle 12.png",
            "profileimg":"public/img/OIP.png"
        },
        {
            "id": 4,
            "username": "@h_dang",
            "image": "public/img/Rectangle 12.png",
            "profileimg":"public/img/OIP.png"
        },
        {
            "id": 5,
            "username": "@h_dang",
            "image": "public/img/Rectangle 12.png",
            "profileimg":"public/img/OIP.png"
        },
        {
            "id": 6,
            "username": "@h_dang",
            "image": "public/img/Rectangle 12.png",
            "profileimg":"public/img/OIP.png"
        },
    ]
    const handleSelect = (index) => {
        setMenuItems((prevItems) =>
            prevItems.map((item, idx) => ({
                ...item,
                select: idx === index,
            }))
        );
    };

    return (
        <div>
            {isLogin ? <HeaderAfterLogin /> : <Header />}
            <div className='sub_menu'>
                {menuItems.map((item, index) => (
                    <div
                        className={item.select ? 'sub_menu_item_selected' : 'sub_menu_item'}
                        onClick={() => handleSelect(index)}
                        key={'item' + index}
                    >
                        <div>
                            {item.icon}
                        </div>
                        <div className='sub_menu_text'>
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>
            <HomeBanner />
            <section className='category'>
                <Category item={category} />
            </section>
            <section className='productlist-1'>
                <ProductList1 products={products} />
            </section>
            <section className='medialist '>
                <MediaList media={media} />
            </section>
            <section className='productlist-2'>
                <Productlist2 products={products}/>
            </section>
            <section className='productlist-3'>
                <ProductList3 products={products}/>
            </section>
            <Footer />
        </div>
    );
}

