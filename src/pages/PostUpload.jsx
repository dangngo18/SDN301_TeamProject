import React, { useState, useRef } from 'react'
import { HeaderforStudio } from '../components/Header'
import 'swiper/css/free-mode';
import "../assets/styles/postManage.scss"
import { Icon } from '../assets/icon/icons';
import { Post_Image, Post_Videos, product_tag } from '../Test/Jsontest';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';


export default function PostUpload() {
    const [isDisable, setDisable] = useState(true);
    const [postMedia, setPostMedia] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [productTags, setProductTags] = useState([]);


    const [isFocused, setIsFocused] = useState(false);

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
            if (!files[i].type.includes("image")) continue;
            if (!postMedia.some((e) => e.name === files[i].name)) {
                const image = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: files[i].name,
                    url: URL.createObjectURL(files[i]),
                    type: "image"
                }
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
            if (!files[i].type.includes("image")) continue;
            if (!postMedia.some((e) => e.name === files[i].name)) {
                const image = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: files[i].name,
                    url: URL.createObjectURL(files[i]),
                    type: "image"
                }
                setPostMedia((preImages) => [...preImages, image]);
            }
        }
        setIsDragging(false);
    }

    const removeProduct = (id) => {
        setProductTags(productTags.filter((product) => product.id !== id));
    }
    // =================================================== Form prepairing =====================================

    function handleSubmit(event) {
        // event.preventDefault();
        const flag = false;
        if (postTitle === '') {
            flag = true;
        }
        if (postMedia.length === 0) {
            flag = true;
        }
        if (postMedia.length > 10) {
            flag = true;
        }
        if (productTags.length === 0) {
            flag = true;
        }
        if (flag) {
            event.preventDefault();
            console.log("error");
        } else {
            const postData = {
                postMedia,
                postTitle,
                postDescription,
                productTags
            }
            console.log(postData);
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
                                        <button className="btnRemove" onClick={() => removeImage(postMedia.id)}>{Icon.Remove}</button>
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
                            <button className="btnRemove" onClick={() => removeImage(postMedia.id)}>{Icon.Remove}</button>
                            <button className="btnView">{Icon.ViewIcon}</button>
                        </div>
                        <img src={postMedia.url} alt={postMedia.name} />
                    </div >
                ))
            )
        }
    }
    const handleAdd = (id) => {
        setProductTags((productTags) => {
            // Tìm sản phẩm dựa trên id
            const newProduct = product_tag.find((product) => product.id === id);

            // Kiểm tra nếu sản phẩm đã tồn tại trong productTags
            const isDuplicate = productTags.some((product) => product.id === id);

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
            product.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        return (
            product_filter.map((product) => (
                <div className="post_product_tag" key={product.id} onClick={() => handleAdd(product.id)}>
                    <div className="product_data">
                        <div className='product_data_image'>
                            <img src={product.url} alt={product.name} />
                        </div>
                        <span>{product.name}</span>
                    </div>
                </div>
            ))
        );
    };

    const renderProductTags = () => {
        return (
            productTags.map((product, index) => (
                <div className="post_product_tag" key={index} title={product.name}>
                    <div className="product_data_image" >
                        <picture>
                            <img src={product.url} alt={product.name} />
                        </picture>
                    </div>
                    <button className="product_action_remove" onClick={() => removeProduct(product.id)}>
                        {Icon.Remove}
                    </button>
                    <div className="product_data_content">

                        <p className="product_name">
                            {product.name}
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
            <HeaderforStudio />
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

                                                        // postMedia.length > 4 ?
                                                        //     (
                                                        <div className={`post_image_container`}>

                                                            {renderMedia()}

                                                            <LabelInput />
                                                        </div>
                                                        // ) : (
                                                        //     <div className={`post_image_container`}>
                                                        //         <Swiper
                                                        //         // slidesPerView={4}
                                                        //         // spaceBetween={10}
                                                        //         // freeMode={true}
                                                        //         // modules={[FreeMode]}
                                                        //         className="myswiper"
                                                        //         >
                                                        //             {renderMedia()}
                                                        //         </Swiper>
                                                        //         <LabelInput />
                                                        //     </div>
                                                        // )

                                                    ) :
                                                    (
                                                        <LabelInput />
                                                    )}
                                                <input id="post_image_input" type="file" accept="image/*" style={{ display: 'none' }} multiple onChange={onFileSelect} />
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
                                        <img src="../img/Bloons 6のTwitterイラスト検索結果。.png" alt="" />
                                    </picture>
                                    <span className='post_right_profile-name'>@hdang_n</span>
                                </div>
                                <div className="post_right_profile_dashboard">
                                    <div className="profile_dashboard_item">
                                        Following
                                        <span>166</span>
                                    </div>
                                    <div className="profile_dashboard_item">
                                        Followers
                                        <span>2,904</span>
                                    </div>
                                    <div className="profile_dashboard_item">
                                        Posts
                                        <span>{Post_Image.length + Post_Videos.length}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="post_right_btn_action">
                                <button type='submit' role='submit' className={`btn_style1 ${isDisable ? 'disabled' : ''}`} disabled={isDisable}>Upload</button>
                                <a href="/profile/posts" className='btn_style1 btn_style2'>Cancel</a>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </>
    )
}
