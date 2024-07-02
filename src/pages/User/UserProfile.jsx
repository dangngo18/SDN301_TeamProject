import React, { useEffect, useRef, useState } from 'react'
import { HeaderforStyle } from '../../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import { ListUser } from '../../Test/Jsontest'
import { Icon } from '../../assets/icon/icons'
import '../../assets/styles/User.scss'
import { useParams } from 'react-router-dom'
import { Nopost, PostMasonryLoop } from '../../components/Post_loop'
import axios from 'axios'

export default function UserProfile() {
    const [currentTab, setCurrentTab] = useState('1');
    const [currentFollow, setCurrentFollow] = useState('1');
    const [showFollow, setShowFollow] = useState(false);
    const diaLogShow = useRef(null);
    const token = localStorage.getItem('token');
    const { idUser } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:8080/user/${idUser}`);
                console.log("User Data", userResponse.data);
                setUser(userResponse.data);

                const postsResponse = await axios.get(`http://localhost:8080/style/posts/user/${idUser}`);
                console.log("Post Data", postsResponse.data);
                setPosts(postsResponse.data);

            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [idUser]);

    if (!user || !posts) {
        return <div className='loading'></div>
    }
    console.log("User" + user)
    console.log("Post" + posts)
    const users = {
        userId: user.userId,
        profileName: user.profileName || "",
        username: user.username || "",
        bio: user.bio || "",
        email: user.email || "",
        urlImage: user.urlImage || "",
        following: user.following || [],
        followers: user.followers || [],
        productTags: user.productTags || []
    };

    const { userId, profileName, username, bio, email, urlImage, following, followers, productTags } = users;



    const tabItem = [
        {
            id: 1,
            tab: "Image",
            content: posts.length != 0 ? posts : null,
            user: { userId, profileName, urlImage }
        },
        {
            id: 2,
            tab: "Videos",
            content: posts.length != 0 ? posts : null,
            user: { userId, profileName, urlImage }
        },
        {
            id: 3,
            tab: "Archived",
            content: posts.length != 0 ? posts : null,
            user: { userId, profileName, urlImage }
        },
        {
            id: 4,
            tab: "tag_products",
            content: productTags
        }
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    const handleOpenFollow = (followType) => {
        setCurrentFollow(followType);
        setShowFollow(true);
        document.body.style.overflow = 'hidden';
    };

    function ModalFollow() {
        const tabItems = [
            {
                id: 1,
                tab: "Following",
                content: following
            },
            {
                id: 2,
                tab: "Followers",
                content: followers
            }
        ];

        const handleTab = (e) => {
            setCurrentFollow(e.target.id);
        }
        return (
            <>
                <div id='follow-modal' className={`follow_layout ${showFollow ? 'show' : ''}`}>
                    <div className="follow_container">
                        <div className="follow_wrapper">
                            <div className="follow_header">
                                <picture>
                                    <img src={urlImage} alt="avatar" />
                                </picture>
                                <span>{name}</span>
                                <button className="closeModal" onClick={() => { setShowFollow(false); document.body.style.overflow = 'auto' }}>{Icon.Remove}</button>
                            </div>
                            <div className="follow_body">
                                <nav>
                                    <ul className="follow_tabbar">
                                        {tabItems.map((tab, i) => {
                                            return (
                                                <li className={`tablist_item ${currentFollow === `${tab.id}` ? 'active' : ''}`} key={i}>
                                                    <button type='button' id={tab.id} onClick={(e) => { handleTab(e) }} >{`${tab.tab} ${tab.content.length}`}</button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </nav>
                                <div className="follow_list_container">

                                    {tabItems.map((tab, i) => {
                                        return (
                                            <div className="follow_list" key={i}>
                                                {currentFollow === `${tab.id}` && (tab.content.length != 0 ? (
                                                    tab.content.map((item, index) => {
                                                        return (
                                                            <div className="follow_item" key={index}>
                                                                <Link className='follow_item_link' to={`/user/profile/${item.id}`}>
                                                                    <div className="follow_item_avatar">
                                                                        <img src={item.urlImage} alt="Avatar" />
                                                                    </div>
                                                                    <div className="follow_item_info">
                                                                        <p className="follow_item_info_name">{item.name}</p>
                                                                        <p className="follow_item_info_username">{item.username}</p>
                                                                    </div>
                                                                </Link>
                                                                <button className={`follow_item_btn ${item.isFollow ? "followed" : ""}`} onClick={(e) => e.stopPropagation()}>
                                                                    {item.isFollow ? "Following" : "Follow back"}
                                                                </button>
                                                            </div>
                                                        )
                                                    })

                                                ) : <Nopost />)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="follow_bg" onClick={() => { setShowFollow(false); document.body.style.overflow = "auto"; }}></div>
                </div>
            </>
        )
    }
    function ModalEdit() {
        const [imageEdit, setImageEdit] = useState(urlImage);
        const [usernameEdit, setUsernameEdit] = useState(username);
        const [nameEdit, setNameEdit] = useState(profileName);
        const [bioEdit, setBioEdit] = useState(bio);
        const [isEditDisable, setIsEditDisable] = useState(true);

        const maxChars = 255;

        const handleTextArea = (event) => {
            const inputText = event.target.value;
            if (inputText.length <= maxChars) {
                setBioEdit(inputText);
            } else {
                setBioEdit(inputText.substring(0, maxChars));
            }
        };

        return (
            <>
                <dialog id='edit-modal' className="edit_layout" ref={diaLogShow}>
                    <div className="edit_container">
                        <form className="edit_wrapper">
                            <div className="edit_header">
                                <h3 className="edit_header_title">
                                    Edit profile
                                </h3>
                                <button className="closeModal" type='button' onClick={(e) => { diaLogShow.current.close(); document.body.style.overflow = "auto"; }}>{Icon.Remove}</button>

                            </div>
                            <div className="edit_form">
                                {/* ================ row 1 ========================= */}
                                <div className="edit_form_row">
                                    <div className="edit_form_col_1">
                                        <h3>Profile photo</h3>
                                    </div>
                                    <div className="edit_form_col_2">
                                        <div className="edit_form_col_2_image">
                                            <img src={imageEdit} alt="Avatar" />
                                            <button className="image_edit_btn">
                                                {Icon.EditImage}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="edit_form_col_1"></div>
                                </div>
                                {/* ================ row 2 ========================= */}
                                <div className="edit_form_row">
                                    <div className="edit_form_col_1">
                                        <h3>Username</h3>
                                    </div>
                                    <div className="edit_form_col_2">
                                        <input type="text" name="username" placeholder='e.g. johndoe' onChange={(e) => { setUsernameEdit(e.target.value) }} value={usernameEdit} />
                                        <p className='edit_form_col_2_url'>www.sufy.com/@{usernameEdit}</p>
                                        <p className="edit_form_col_2_note">
                                            Usernames can only contain letters, numbers, underscores, and
                                            periods. Changing your username will also change your profile link.
                                        </p>
                                    </div>
                                    <div className="edit_form_col_1"></div>
                                </div>
                                {/* ================ row 3 ========================= */}
                                <div className="edit_form_row">
                                    <div className="edit_form_col_1">
                                        <h3>Name</h3>
                                    </div>
                                    <div className="edit_form_col_2">
                                        <input type="text" name="name" placeholder='e.g. John Doe' onChange={(e) => setNameEdit(e.target.value)} value={nameEdit} />
                                        <p className="edit_form_col_2_note">
                                            Your nickname can only be changed once every 7 days.
                                        </p>
                                    </div>
                                    <div className="edit_form_col_1"></div>
                                </div>
                                {/* ================ row 4 ========================= */}
                                <div className="edit_form_row">
                                    <div className="edit_form_col_1">
                                        <h3>Bio</h3>
                                    </div>
                                    <div className="edit_form_col_2">
                                        <textarea rows={5} cols={51} name="bio" placeholder='e.g. I love to travel' onChange={handleTextArea} value={bioEdit}></textarea>
                                        <p className="edit_form_col_2_note">
                                            {bioEdit.length}/{maxChars}
                                        </p>
                                    </div>
                                    <div className="edit_form_col_1"></div>
                                </div>

                            </div>
                            <div className="edit_action_btn">
                                <button type="reset" className='btn_cancel' onClick={() => { diaLogShow.current.close(); document.body.style.overflow = "auto"; }}>Cancel</button>
                                <button type="submit" className={`btn_submit ${(imageEdit != urlImage) || (usernameEdit != username) || (nameEdit != profileName) || (bioEdit != bio) ? "" : "disabled"}`} disabled={(imageEdit != urlImage) || (usernameEdit != username) || (nameEdit != profileName) || (bioEdit != bio) ? false : true}>Save</button>
                            </div>
                        </form>
                    </div>
                    <div className="edit_bg" onClick={() => { diaLogShow.current.close(); document.body.style.overflow = "auto"; }}></div>
                </dialog>
            </>
        )
    }
    return (
        <>
            <HeaderforStyle />
            <main className="user_profile">
                <div className="user_container container">
                    <div className="user_top_info">
                        <Link className="top_info_image" to={urlImage}><img src={urlImage} alt="Avatar" /></Link>
                        <div className="top_info_data">
                            <div className="top_info_data_name">
                                <h2>{profileName}</h2>
                                <div className="upload_button">
                                    <button onClick={() => { diaLogShow.current.show(); document.body.style.overflow = "hidden"; }}><span>{Icon.EditIcon}</span>Edit profile</button>
                                </div>
                            </div>
                            <ul className="top_info_data_followList">
                                <li className="followList_item" onClick={() => { handleOpenFollow('1'); }}>Following <span>{following != null ? following.length : ""}</span></li>
                                <li className="followList_item" onClick={() => { handleOpenFollow('2'); }}>Followers <span>{followers != null ? followers.length : ""}</span></li>
                            </ul>
                            <div className="top_info_data_bio">
                                <p>{bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className="user_bottom_info">
                        <div className="post_col_left post_col_left_profile">
                            <div className="post_left_header">
                                <nav>
                                    <ul className="tablist" arial-label="TabPost">
                                        {tabItem.map((tab, i) => {
                                            return (
                                                <li className={`tablist_item ${currentTab === `${tab.id}` ? 'active' : ''}`} key={i}>
                                                    <input type="button" id={tab.id} onClick={(handleTabClick)} value={`${tab.tab} ${tab.content != null ? tab.content.length : ''}`} />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </nav>
                            </div>
                            <div className="post_left_body">
                                <div className="post_left_body_container">
                                    <div className="post_left_body_wrapper">
                                        {tabItem.map((tab, i) => {
                                            console.log(tab.content)
                                            return (
                                                <div className="post_left_body_macy" id='body-macy' key={i}>
                                                    {currentTab === tab.id && (tab.content
                                                        ?
                                                        <PostMasonryLoop Posts={tab.content} User={tab.user} />
                                                        :
                                                        <Nopost />)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ModalFollow />
            <ModalEdit />
            <Footer />
        </>

    )
}
