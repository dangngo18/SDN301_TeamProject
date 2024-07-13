import React, { useState, useRef, useEffect, useContext } from 'react'
import 'swiper/css/free-mode';
import "../../assets/styles/postManage.scss"
import { Icon } from '../../assets/icon/icons';
import { product_tag } from '../../Test/Jsontest';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { API, token } from '../../config';
import { useNavigate } from 'react-router-dom';
import Main from '../../ultils/container';
import { uploadImagesToImgbb } from '../../components/function';
import { SessionContext } from '../../Context';


export default function PostUpload() {
    const [isDisable, setDisable] = useState(true);
    const [postMedia, setPostMedia] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [productTags, setProductTags] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const user = useContext(SessionContext);

    useEffect(() => {
        if (postMedia.length > 0 && postTitle.length > 0) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [postMedia, postTitle])

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    // ============================================== Drag between image =========================
    // ============================================== Drag image into file =======================
    function onFileSelect(event) {
        const files = event.target.files;
        if (files.length === 0) return;

        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.includes("image") && !files[i].type.includes('video')) continue;
            if (files[i].type.includes('video')) {
                const video = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: files[i].name,
                    url: URL.createObjectURL(files[i]),
                    file: files[i],
                    type: "video"
                };
                setPostMedia((preImages) => [...preImages, video]);
                break;
            }
            if (!postMedia.some((e) => e.name === files[i].name)) {
                const image = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: files[i].name,
                    url: URL.createObjectURL(files[i]),
                    file: files[i],
                    type: "image"
                };
                setPostMedia((preImages) => [...preImages, image]);
            }
        }
    }


    function removeImage(id) {
        setPostMedia((preImages) => preImages.filter((e) => e.id !== id));
    }

    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.includes("image") && !files[i].type.includes('video')) continue;
            if (files[i].type.includes('video')) {
                const video = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: files[i].name,
                    url: URL.createObjectURL(files[i]),
                    file: files[i],
                    type: "video"
                };
                setPostMedia((preImages) => [...preImages, video]);
                break;
            }
            if (!postMedia.some((e) => e.name === files[i].name)) {
                const image = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: files[i].name,
                    url: URL.createObjectURL(files[i]),
                    file: files[i],
                    type: "image"
                };
                setPostMedia((preImages) => [...preImages, image]);
            }
        }

        setIsDragging(false);
    }

    const removeProduct = (id) => {
        setProductTags(productTags.filter((product) => product.productId !== id));
    }
    // =================================================== Form prepairing =====================================


    async function postDataToServer(postData) {
        let mounted = false;
        if (!mounted) {
            try {

                const response = await fetch(`${API}/studio/upload`, {
                    method: 'POST',
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
        return () => mounted = true;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let flag = false;
        if (postTitle === '') {
            flag = true;
        }
        if (postMedia.length === 0) {
            flag = true;
        }
        if (postMedia.length > 10) {
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
                    urlVideo = videoUploadResponse.length > 0 ? videoUploadResponse[0].url : null;
                } else {
                    images = await uploadImagesToImgbb(postMedia);
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
                navigate("/studio/posts");
            } else {
                console.log("Upload Fail");
            }
        }
    }
    // ======================================================= Child  Components =========================================
    const LabelInput = () => {
        return (
            <label htmlFor="post_image_input" className="post_image_upload"
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                {isDragging ? (
                    <div className="post_image_drag_area_text">
                        <img src="../FileAnimation.gif" alt="add file animation" />
                        <h3>Drop your files here</h3>
                    </div>
                ) : (
                    <>
                        {Icon.Camera}
                        <h3>Upload your photo</h3>
                        <p>Click or drag file to this area</p>
                    </>
                )}

            </label>
        )
    }
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
                                        <button className="btnRemove" type='button' onClick={() => removeImage(postMedia.id)}>{Icon.Remove}</button>
                                        <button className="btnView">{Icon.ViewIcon}</button>
                                    </div>
                                    <img src={postMedia.url} alt={postMedia.name} />
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
                            <button className="btnRemove" type='button' onClick={() => removeImage(postMedia.id)}>{Icon.Remove}</button>
                            <button className="btnView">{Icon.ViewIcon}</button>
                        </div>
                        {postMedia.type == "image" ? (
                            <img src={postMedia.url} alt={postMedia.name} />
                        ) : (
                            <video src={postMedia.url}></video>
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


    // ================================================== Main Component =============================
    return (
        <>
            <Main>
                <main className="post_main">
                    <form onSubmit={handleSubmit} className='new-post-form'>
                        <div className="post_container container">
                            <div className="post_col_left">
                                <div className="post_left_header">
                                    <h2>New Post</h2>
                                </div>
                                <div className="post_left_body">
                                    <div className="post_left_body_container">
                                        <div className="post_left_body_form">
                                            <div className="post_image">
                                                <div className={`post_image_drag_area`} >
                                                    {postMedia.length > 0 ?
                                                        (
                                                            <div className={`post_image_container`}>

                                                                {renderMedia()}

                                                                <LabelInput />
                                                            </div>
                                                        ) :
                                                        (
                                                            <LabelInput />
                                                        )}
                                                    <input id="post_image_input" type="file" accept="image/*,video/*" style={{ display: 'none' }} multiple onChange={onFileSelect} />
                                                </div>
                                            </div>
                                            <div className="post_title">
                                                <h2>Post title *</h2>
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
                                            <span>{}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="post_right_btn_action">
                                    <button type='submit' role='submit' className={`btn_style1 ${isDisable ? 'disabled' : ''}`} disabled={isDisable}>Upload</button>
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
