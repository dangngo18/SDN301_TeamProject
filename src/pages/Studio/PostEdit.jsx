import React, { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { HeaderforStudio } from '../../components/Header'
import 'swiper/css/free-mode';
import "../../assets/styles/postManage.scss"
import { Icon } from '../../assets/icon/icons';
import { Post_Image, Post_Videos, product_tag } from '../../Test/Jsontest';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import Main from '../../ultils/container';
import { API, token } from '../../config';
import { SessionContext } from '../../Context';


export default function PostEdit() {
    const [isDisable, setDisable] = useState(true);
    const [postMedia, setPostMedia] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [productTags, setProductTags] = useState([]);
    const { postId } = useParams();
    const [isFocused, setIsFocused] = useState(false);
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const user = useContext(SessionContext);

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            const response = await fetch(`${API}/studio/posts/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (response.status == 401) {
                window.localStorage.clear();
                window.location.href = "/login"
            }
            const data = await response.json();
            setPost(data);
            if (response.ok) {
                if (data.image.length > 0) {
                    let arrPost = []
                    for (let i = 0; i < data.image.length; i++) {
                        if (!postMedia.some((e) => e.name === data.image[i].alt)) {
                            const picture = {
                                id: `data${i}`,
                                name: data.image[i].alt,
                                url: data.image[i].urlImage,
                                type: "image",
                                aspect: data.image[i].aspect,
                            };
                            arrPost.push(picture);
                        }
                    }
                    setPostMedia(arrPost);
                } else {
                    const video = {
                        id: Math.random().toString(36).substring(2, 9),
                        name: "a video",
                        url: data.urlVideo,
                        type: "video",
                        aspect: "vertical"
                    }
                    setPostMedia((prevState) => [...prevState, video]);
                }
                setPostTitle(data.title);
                setPostDescription(data.content);
                setProductTags(data.productTags);
            }
            setIsLoading(false);
        }
        fetchPost();
    }, []);
    useEffect(() => {
        if (post.title != postTitle || post.content != postDescription || post.productTags != productTags) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [postTitle, postDescription, productTags])

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    // ============================================== Drag between image =========================

    const removeProduct = (id) => {
        setProductTags(productTags.filter((product) => product.productId !== id));
    }
    // =================================================== Form prepairing =====================================

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     let flag = false;
    //     if (postTitle === '') {
    //         flag = true;
    //     }
    //     if (postMedia.length === 0) {
    //         flag = true;
    //     }
    //     if (postMedia.length > 10) {
    //         flag = true;
    //     }
    //     if (productTags.length === 0) {
    //         flag = true;
    //     }
    //     if (flag) {
    //         console.log("error");
    //     } else {
    //         const postData = {
    //             postMedia,
    //             postTitle,
    //             postDescription,
    //             productTags
    //         }
    //         console.log(postData);
    //     }

    // }

    async function handleArchive(bool) {
        confirm("Agree to archive");
        try {
            const response = await fetch(`${API}/studio/posts/archive/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    isVisible: bool
                })
            })
        } catch (err) {
            console.log(err);
        }
    }
    // ======================================================= Child  Components =========================================

    const renderMedia = () => {

        if (postMedia.length > 5) {
            return (
                <Swiper
                    slidesPerView={4}
                    spaceBetween={8}
                    freeMode={true}
                    modules={[FreeMode]}
                    className='SwiperContainer'>{
                        postMedia.map((postMedia, index) => (
                            <SwiperSlide
                                key={index}>
                                <div className="post_image_item" >
                                    <div className="post_media_overlay">
                                        <button className="btnView">{Icon.ViewIcon}</button>
                                    </div>
                                    <img src={postMedia.url || "https://i.ibb.co/VVck3zQ/5e6d34034c89.jpg"} alt={postMedia.name || ""} />
                                </div >
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            )
        } else {

            return (
                postMedia.map((postMedia, index) => (
                    <div className="post_image_item" key={index}>
                        <div className="post_media_overlay">
                            <button className="btnView">{Icon.ViewIcon}</button>
                        </div>
                        {postMedia.type == "image" ? (
                            <img src={postMedia.url || "https://i.ibb.co/VVck3zQ/5e6d34034c89.jpg"} alt={postMedia.name || ""} />
                        ) : (
                            <video src={postMedia.url || "https://i.ibb.co/VVck3zQ/5e6d34034c89.jpg"}></video>
                        )}
                    </div >
                ))
            )
        }


    }
    const handleAdd = (id) => {
        setProductTags((productTags) => {
            // Tìm sản phẩm dựa trên id
            const newProduct = product_tag.find((product) => product.productId === id);

            // Kiểm tra nếu sản phẩm đã tồn tại trong productTags
            const isDuplicate = productTags.some((product) => product.productId === id);

            // Nếu sản phẩm không tồn tại, thêm nó vào productTags
            if (!isDuplicate && newProduct) {
                return [...productTags, newProduct];
            }

            // Nếu sản phẩm đã tồn tại, trả về productTags hiện tại
            return productTags;
        });
    };

    const searchResult = () => {
        if (searchInput === "") return
        const product_filter = product_tag.filter(product =>
            product.productName.toLowerCase().includes(searchInput.toLowerCase())
        );
        return (
            product_filter.map((product) => (
                <div className="post_product_tag" key={product.productId} onClick={() => handleAdd(product.productId)}>
                    <div className="product_data">
                        <div className='product_data_image'>
                            <img src={product.urlImage} alt={product.productName} />
                        </div>
                        <span>{product.productName}</span>
                    </div>
                </div>
            ))
        );
    };

    const renderProductTags = () => {
        return (
            productTags.map((product, index) => (
                <div className="post_product_tag" key={index} title={product.productName}>
                    <div className="product_data_image" >
                        <picture>
                            <img src={product.urlImage} alt={product.productName} />
                        </picture>
                    </div>
                    <button className="product_action_remove" type='button' onClick={() => removeProduct(product.productId)}>
                        {Icon.Remove}
                    </button>
                    <div className="product_data_content">

                        <p className="product_name">
                            {product.productName}
                        </p>
                        <span className="product_price">
                            {product.price} vnd
                        </span>
                    </div>
                </div>
            ))
        );
    };


    async function postDataToServer(postData) {
        try {

            const response = await fetch(`${API}/studio/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            console.log("Json Data ", JSON.stringify(postData));
            console.log("Response ", response);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let flag = false;
        if (postTitle === '') {
            flag = true;
        }
        if (flag) {
            console.log("error");
        } else {
            let urlVideo = null;
            let images = [];
            if (postMedia.length > 0) {
                if (postMedia[0].type === 'video') {
                    const videoUploadResponse = await uploadImagesToImgbb([postMedia[0]]);
                    urlVideo = postMedia[0].url;
                } else {
                    postMedia.forEach((media) => {
                        const newImage = {
                            alt: media.alt,
                            urlImage: media.url,
                            aspect: media.aspect
                        }
                        images.push(newImage);
                    })
                }
            }
            const postData = {
                title: postTitle,
                content: postDescription,
                productTags: productTags,
                image: images,
                urlVideo: urlVideo
            };
            const result = await postDataToServer(postData); // Ensure this function handles the async call properly
            if (result.status === 200) {
                console.log("Save success")
                navigate("/studio/posts");
            } else {
                console.log("Upload Fail");
            }
        }
    }


    // ================================================== Main Component =============================
    return (
        <>
            <Main>

                <main className="post_main">
                    <form onSubmit={handleSubmit} className='new-post-form'>
                        <div className="post_container container">
                            <div className="post_col_left">
                                <div className="post_left_header">
                                    <h2>Post Detail</h2>
                                </div>
                                <div className="post_left_body">
                                    <div className="post_left_body_container">
                                        <div className="post_left_body_form">
                                            <div className="post_image">
                                                <div className={`post_image_drag_area`} >
                                                    <div className={`post_image_container`}>
                                                        {renderMedia()}
                                                    </div>
                                                    <input id="post_image_input" type="file" accept="image/*" style={{ display: 'none' }} multiple />
                                                </div>
                                            </div>
                                            <div className="post_title">
                                                <h2>Post title</h2>
                                                <input type='text' placeholder='Hightlight your post with a title' value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                                            </div>
                                            <div className="post_description">
                                                <h2>Description</h2>
                                                <textarea placeholder='Describe something about your post' value={postDescription} onChange={(e) => setPostDescription(e.target.value)} rows={4} />
                                                <p>0/255</p>
                                            </div>
                                            <div className="post_title post_search">
                                                <h2>Tag products</h2>
                                                <div className='Search_box'>
                                                    <input type='text' placeholder='Search a product you want to tag in' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                                                    <button className='btn_style1'>{Icon.Search}</button>
                                                </div>
                                                <div className="post_product_list">
                                                    {renderProductTags()}
                                                </div>
                                            </div>
                                            <div className={`post_search_result ${isFocused ? 'show' : ''}`}>
                                                {searchResult()}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="post_col_right">
                                <div className="post_right_profile">
                                    <div className="post_right_profile_info">
                                        <picture className="post_right_profile-img">
                                            <img src={user.urlImage} alt="" />
                                        </picture>
                                        <span className='post_right_profile-name'>@{user.username}</span>
                                    </div>
                                    <div className="post_right_profile_dashboard">
                                        <div className="profile_dashboard_item">
                                            Following
                                            <span>{user.following.length}</span>
                                        </div>
                                        <div className="profile_dashboard_item">
                                            Followers
                                            <span>{user.followers.length}</span>
                                        </div>
                                        {/* <div className="profile_dashboard_item">
                                            Posts
                                            <span>{Post_Image.length + Post_Videos.length}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="post_right_profile">
                                    <div className="post_right_profile_dashboard">
                                        <div className="profile_dashboard_item edit">
                                            {Icon.Heart}
                                            <span>{post.likeList ? post.likeList.length : 0}</span>
                                        </div>
                                        <div className="profile_dashboard_item edit">
                                            {Icon.Comment2}
                                            <span>{post.commentList ? post.commentList.length : 0}</span>
                                        </div>
                                        <div className="profile_dashboard_item edit">
                                            {Icon.Save2}
                                            <span>{post.saveNumber}</span>
                                        </div>
                                        <div className="profile_dashboard_item share edit">
                                            {Icon.Share2}
                                            <span>{post.shareNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="post_right_btn_action">
                                    <button type='button' onClick={() => post.isVisible ? handleArchive(false) : handleArchive(true)} className={`btn_style1 btn_archived`} title='Visible'>{post.isVisible ? Icon.Archive : Icon.Restore}</button>
                                    <button type='submit' role='submit' onClick={handleSubmit} className={`btn_style1 ${isDisable ? 'disabled' : ''}`} disabled={isDisable}>Save</button>
                                    <a href="/studio/posts" className='btn_style1 btn_style2'>Cancel</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </Main>
        </>
    )
}
