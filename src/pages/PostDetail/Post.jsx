import React from 'react'
import ProductCard from '../../components/ProductCard'
import { Icon } from '../../assets/icon/icons'
import { PostLoopTab, PostLoopTabLimited } from '../../components/Post_loop'
import { Post_Image } from '../../Test/Jsontest'
export default function Post() {
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
    const img = ["https://i.ibb.co/P4m9gPf/p-9b865d844e0b4272ae6b3cc60bef7a5d.jpg",
        "https://i.ibb.co/P4m9gPf/p-9b865d844e0b4272ae6b3cc60bef7a5d.jpg",
        "https://i.ibb.co/P4m9gPf/p-9b865d844e0b4272ae6b3cc60bef7a5d.jpg"
    ]
    
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? img.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === img.length - 1 ? 0 : prevIndex + 1));
        console.log("click")
    };
    return (
        <div className='blog-container container'>
            <div className='blog-wrapper'>
                <div className='blog'>
                    <div className='blog-title'>
                        <div className='blog-title-profile'>
                            <div className='user-avatar'>
                                <img src="/img/OIP.png" alt="" />
                            </div>
                            <div className='user'>
                                <div className='username'>
                                    j_c-y
                                </div>
                                <div className='date'>
                                    3 hours ago
                                </div>
                            </div>
                        </div>
                        <div className='blog-title-option'>
                            <button className='blog-title-btn'>
                                Follow
                            </button>
                            <div className='blog-title-dots'>
                                ...
                            </div>
                        </div>
                    </div>
                    <div className='blog-image-container'>
                        {img.length > 1 ? (
                            <>
                                <div className='blog-image'>
                                    {img.map((item) => (
                                        <img className='image' src={item} alt=""
                                            style={{ translate: `${-100 * currentIndex}%` }} />
                                    ))}
                                    <div className='slide-btn'>
                                        <div className='left' onClick={handlePrev}>
                                            <button>
                                                {Icon.Left}
                                            </button>
                                        </div>
                                        <div className='right' onClick={handleNext}>
                                            <button>
                                                {Icon.Right}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='dots'>
                                    {img.map((_, index) => (
                                        <div key={index} className={currentIndex === index ? 'dot-active' : 'dot'} />
                                    ))}
                                </div>
                            </>
                        )
                            : (
                                <>
                                    <div className='blog-image'>
                                        {img.map((item) => (
                                            <img className='image' src={item} alt=""
                                                 />
                                        ))}
                                    </div>
                                </>
                            )}

                    </div>
                </div>
                <div className='list-items'>
                    <h2 className='list-items-title'>
                        product tag<span> 3 </span>items
                    </h2>
                    <div className='list-items-content'>
                        {products.map((product) => (
                            <ProductCard product={product} />
                        ))
                        }
                    </div>
                </div>
                <div className='blog-action'>
                    <div className='share'>
                        <button>
                            {Icon.Share}
                        </button>
                    </div>
                    <div className='post-action'>
                        <div className='like bounce-out'>
                            <label class="container-heart">
                                <input type="checkbox" />
                                <div class="checkmark">
                                    {Icon.Like}
                                </div>
                            </label>
                            <span className='number'>
                                62
                            </span>
                        </div>
                        <div className='comment'>
                            <button>{Icon.Comment}</button>
                            <span className='number'>
                                6
                            </span>
                        </div>
                        <div className='save'>
                            <input type="checkbox" id="checkboxInput" />
                            <label htmlFor="checkboxInput" className="bookmark">
                                {Icon.Save}
                            </label>
                            <span className='number'>
                                4
                            </span>
                        </div>
                    </div>
                </div>
                <div className='blog-content'>
                    <div className='blog-content-title'>
                        summer🍀
                    </div>
                    <div className='blog-content-description'>
                        Derby shoes are pretty 😎
                    </div>
                </div>
            </div>
            <div className='blog-related'>
                <div className='block-tag-block'>
                    <div className='block-tag-title'>
                        <h2>
                            @j__c__y's other styles
                        </h2>
                        <div className='see-more'>
                            See more
                        </div>
                    </div>
                    <div className='block-tag-slide'>
                        <PostLoopTabLimited Posts={Post_Image} />
                    </div>
                </div>
            </div>
        </div>
    )
}
