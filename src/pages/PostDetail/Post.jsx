import React, { Fragment, useContext, useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { Icon } from '../../assets/icon/icons'
import { PostLoopTabLimited } from '../../components/Post_loop'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { formatDistanceToNow } from 'date-fns';
import { SessionContext } from '../../Context'
import { token, API } from '../../config'
import { useNavigate } from 'react-router-dom';

export default function Post({ PostProp, postsRelated }) {
    const Post = PostProp.post;
    const User = PostProp.user;
    const CurrentUser = useContext(SessionContext) || null;
    const [isFollowed, setIsFollowed] = useState(CurrentUser ? CurrentUser.following.some((e) => e.userId == User.userId) : false);
    const [isLiked, setIsLiked] = useState(CurrentUser ? Post.likeList.some((e) => e.userId == CurrentUser.userId) : false);
    const navigate = useNavigate();

    const handleFollow = async (isFollowed) => {
        const result = await fetch(`${API}/user/func/follow?userId=${User.userId}&isFollowed=${!isFollowed}`, {
            method: "PUT",
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (result.status == 401) {
            window.localStorage.clear();
            window.location.href = "/login"
        }
        if (result.ok) {
            setIsFollowed(!isFollowed);
        }
    }


    const renderPostImage = () => {
        return (
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                centeredSlides={true}
                className='PostSwiperContainer'
                lazy={'true'}
                autoHeight={true}
                pagination={true}
                modules={[Navigation, Pagination]}
                navigation={true}
            >{
                    Post.image.map((image, i) => (
                        <Fragment key={i}>
                            <SwiperSlide className='PostSwiperSlide'>
                                <picture>
                                    <img src={image.urlImage} alt={image.alt} className={image.aspect} />
                                </picture>
                            </SwiperSlide>
                        </Fragment >
                    ))
                }
            </Swiper>
        )
    }
    const handleLike = async () => {
        const result = await fetch(`${API}/style/posts/${Post.postId}/like-action`,
            {
                method: "PUT",
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
        if (result.status == 401) {
            window.localStorage.clear();
            window.location.href = "/login"
        }
        if (result.ok) {
            setIsLiked(!isLiked);
            document.querySelector(`.like-action-content`).innerText = Post.likeList.length + (isLiked ? -1 : 1);
        }
    }
    return (
        <div className='blog-container container'>
            <div className='blog-wrapper'>
                <div className='blog'>
                    <div className='blog-title'>
                        <div className='blog-title-profile' onClick={() => { window.location.href = `/user/profile/${User.userId}` }}>
                            <div className='user-avatar'>
                                <img src={User.urlImage} alt="" />
                            </div>
                            <div className='user'>
                                <div className='username'>
                                    {User.profileName}
                                </div>
                                <div className='date'>
                                    {formatDistanceToNow(new Date(Post.createdDate), { addSuffix: true })}
                                </div>
                            </div>
                        </div>
                        <div className='blog-title-option'>
                            {CurrentUser ? (<>
                                {CurrentUser.userId == User.userId ? (
                                    <></>
                                ) : (
                                    <button type='button' className={`blog-title-btn ${isFollowed ? 'followed' : ''}`} onClick={() => handleFollow(isFollowed)}>
                                        {isFollowed ? "Following" : "Follow"}
                                    </button>
                                )}</>
                            ) : (
                                <button type='button' className={`blog-title-btn ${isFollowed ? 'followed' : ''}`} onClick={() => handleFollow(isFollowed)}>
                                    {isFollowed ? "Following" : "Follow"}
                                </button>
                            )}
                            <div className='blog-title-dots'>
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                    <div className='post-image-container'>
                        {renderPostImage()}
                    </div>
                </div>
                {Post.productTags.length > 0 && (
                    <div className='list-items'>
                        <h2 className='list-items-title'>
                            product tag<span> {Post.productTags.length} </span>items
                        </h2>
                        <div className='list-items-content'>
                            {Post.productTags.map((product, index) => (
                                <Fragment key={index}>
                                    <ProductCard product={product} />
                                </Fragment>
                            ))
                            }
                        </div>
                    </div>
                )}
                <div className='blog-action'>
                    <div className='share'>
                        <button>
                            {Icon.Share}
                        </button>
                    </div>
                    <div className='post-action'>
                        <div className='like bounce-out'>
                            <label className="container-heart">
                                <input type="checkbox" onChange={() => handleLike()} checked={isLiked} />
                                <div className="checkmark">
                                    {Icon.Like}
                                </div>
                            </label>
                            <span className='number like-action-content'>
                                {Post.likeList.length > 0 ? Post.likeList.length : 'Like'}
                            </span>
                        </div>
                        <div className='comment'>
                            <button>{Icon.Comment}</button>
                            <span className='number'>
                                {Post.commentList.length > 0 ? Post.commentList.length : 'Comment'}
                            </span>
                        </div>
                        <div className='save'>
                            <input type="checkbox" id="checkboxInput" />
                            <label htmlFor="checkboxInput" className="bookmark">
                                {Icon.Save}
                            </label>
                            <span className='number'>
                                {Post.saveNumber > 0 ? Post.saveNumber : 'Save'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='blog-content'>
                    <div className='blog-content-title'>
                        {Post.title}
                    </div>
                    <div className='blog-content-description'>
                        {Post.content}
                    </div>
                </div>
            </div>
            <div className='blog-related'>
                <div className='block-tag-block'>
                    <div className='block-tag-title'>
                        <h2>
                            @{User.username}'s other styles
                        </h2>
                        <a href={`/user/profile/${User.userId}`} className='see-more'>
                            See more
                        </a>
                    </div>
                    <div className='block-tag-slide'>
                        <PostLoopTabLimited Posts={postsRelated} />
                    </div>
                </div>
            </div>
        </div>
    )
}
