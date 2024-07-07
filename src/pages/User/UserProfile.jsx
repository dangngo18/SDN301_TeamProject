import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../assets/icon/icons'
import '../../assets/styles/User.scss'
import { useParams } from 'react-router-dom'
import { Nopost, PostMasonryLoop } from '../../components/Post_loop'
import Main from '../../ultils/container'
import { API, token } from '../../config'
import { SessionContext } from '../../Context'

export default function UserProfile() {
    const [currentTab, setCurrentTab] = useState(1);
    const [currentFollow, setCurrentFollow] = useState(1);
    const [showFollow, setShowFollow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const CurrentUser = useContext(SessionContext) || null;
    const [isLoading, setIsLoading] = useState(false);
    const { idUser } = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const userResponse = await fetch(`${API}/user/${idUser}`, {
                    method: "GET"
                }
                );
                const postsResponse = await fetch(`${API}/style/posts/user/${idUser}`, {
                    method: "GET"
                });
                const data1 = await userResponse.json();
                const data2 = await postsResponse.json();
                if (data1 && data2) {
                    setUser(data1);
                    setPosts(data2);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (CurrentUser) {
            if (CurrentUser.following.includes(user.userId)) {
                setIsFollowed(true);
            }
        }
    }, [CurrentUser])

    const handleFollow = async (isFollowed) => {
        const result = await fetch(`http://localhost:8080/user/func/follow/${user.userId}/${isFollowed}`, {
            method: "PUT",
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (result.ok) {
            setIsFollowed(!isFollowed);
        } else {
            navigate('/login');
        }
    }


    const tabItem = CurrentUser ? [
        {
            id: 1,
            tab: "Posts",
            content: posts.filter((post) => post.isVisible == true)
        },
        {
            id: 2,
            tab: "Videos",
            content: posts.filter((post) => post.urlVideo != null && post.image.length == 0 && post.isVisible == true)
        },
        {
            id: 3,
            tab: "Saved",
            content: posts.filter((post) => post.isVisible == false)
        }
    ] : [
        {
            id: 1,
            tab: "Posts",
            content: posts.filter((post) => post.isVisible == true)
        },
        {
            id: 2,
            tab: "Videos",
            content: posts.filter((post) => post.urlVideo != null && post.image.length == 0 && post.isVisible == true)
        },
        {
            id: 3,
            tab: "Tag products",
            content: posts.filter((post) => post.isVisible == false)
        }
    ];

    const handleTabClick = (e) => {
        setCurrentTab(parseInt(e.target.id, 10));
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
                content: user.following || []
            },
            {
                id: 2,
                tab: "Followers",
                content: user.followers || []
            }
        ];

        const handleTab = (e) => {
            setCurrentFollow(parseInt(e.target.id, 10));
        }
        return (
            <>
                <div id='follow-modal' className={`follow_layout ${showFollow ? 'show' : ''}`}>
                    <div className="follow_container">
                        <div className="follow_wrapper">
                            <div className="follow_header">
                                <picture>
                                    <img src={user.urlImage} alt="avatar" />
                                </picture>
                                <span>{user.profileName}</span>
                                <button className="closeModal" onClick={() => { setShowFollow(false); document.body.style.overflow = 'auto' }}>{Icon.Remove}</button>
                            </div>
                            <div className="follow_body">
                                <nav>
                                    <ul className="follow_tabbar">
                                        {tabItems.map((tab, i) => {
                                            return (
                                                <li className={`tablist_item ${currentFollow === tab.id ? 'active' : ''}`} key={i}>
                                                    <button type='button' id={tab.id} onClick={handleTab} >{`${tab.tab} ${tab.content.length}`}</button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </nav>
                                <div className="follow_list_container">

                                    {tabItems.map((tab, i) => {
                                        return (
                                            <div className="follow_list" key={i}>
                                                {currentFollow === tab.id && (tab.content.length != 0 ? (
                                                    tab.content.map((item, index) => {
                                                        return (
                                                            <div className="follow_item" key={index}>
                                                                <Link className='follow_item_link' to={`/user/profile/${item.userId}`}>
                                                                    <div className="follow_item_avatar">
                                                                        <img src={item.urlImage} alt="Avatar" />
                                                                    </div>
                                                                    <div className="follow_item_info">
                                                                        <p className="follow_item_info_name">{item.profileName}</p>
                                                                        <p className="follow_item_info_username">{item.username}</p>
                                                                    </div>
                                                                </Link>
                                                                <button className={`follow_item_btn ${item.isFollow ? "followed" : ""}`}>
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
    if (CurrentUser && CurrentUser.userId == user.userId) {

        function ModalEdit() {

            const [imageEdit, setImageEdit] = useState(user.urlImage);
            const [usernameEdit, setUsernameEdit] = useState(user.username);
            const [nameEdit, setNameEdit] = useState(user.profileName);
            const [bioEdit, setBioEdit] = useState(user.bio || "");

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
                    <div id='edit-modal' className={`edit_layout ${showEdit ? "show" : ""}`}>
                        <div className="edit_container">
                            <form className="edit_wrapper">
                                <div className="edit_header">
                                    <h3 className="edit_header_title">
                                        Edit profile
                                    </h3>
                                    <button className="closeModal" type='button' onClick={(e) => { setShowEdit(false); document.body.style.overflow = "auto"; }}>{Icon.Remove}</button>

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
                                                <button type='button' className="image_edit_btn">
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
                                    <button type="button" className='btn_cancel' onClick={() => { setShowEdit(false); document.body.style.overflow = "auto"; }}>Cancel</button>
                                    <button type="submit" className={`btn_submit ${isEditDisable && "disabled"}`} disabled={isEditDisable}>Save</button>
                                </div>
                            </form>
                        </div>
                        <div className="edit_bg" onClick={() => { setShowEdit(false); document.body.style.overflow = "auto"; }}></div>
                    </div>
                </>
            )

        }
    }
    return (
        <>
            <Main>
                <main className="user_profile">
                    <div className="user_container container">
                        <div className="user_top_info">
                            {isLoading ? (
                                <div>
                                    Loading
                                </div>
                            ) : (
                                <>
                                    <Link className="top_info_image" to={user.urlImage}><img src={user.urlImage} alt="Avatar" /></Link>
                                    <div className="top_info_data">
                                        <div className="top_info_data_name">
                                            <h2>{user.profileName}</h2>
                                            <div className="upload_button">
                                                {CurrentUser ? (<>
                                                    {CurrentUser.userId == user.userId ? (
                                                        <>
                                                            <button onClick={() => { setShowEdit(true); document.body.style.overflow = "hidden"; }}><span>{Icon.EditIcon}</span>Edit profile</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button type='button' className={`blog-title-btn ${isFollowed ? 'followed' : ''}`} onClick={() => handleFollow(!isFollowed)}>
                                                                {isFollowed ? "Following" : "Follow"}
                                                            </button>
                                                            <div className='blog-title-dots'>
                                                                <span></span><span></span><span></span>
                                                            </div>
                                                        </>
                                                    )}</>
                                                ) : (
                                                    <>
                                                        <button type='button' className={`blog-title-btn ${isFollowed ? 'followed' : ''}`} onClick={() => handleFollow(!isFollowed)}>
                                                            {isFollowed ? "Following" : "Follow"}
                                                        </button>
                                                        <div className='blog-title-dots'>
                                                            <span></span><span></span><span></span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <ul className="top_info_data_followList">
                                            <li className="followList_item" onClick={() => { handleOpenFollow(1); }}>Following <span>{user.following && user.following.length}</span></li>
                                            <li className="followList_item" onClick={() => { handleOpenFollow(2); }}>Followers <span>{user.followers && user.followers.length}</span></li>
                                        </ul>
                                        <div className="top_info_data_bio">
                                            <p>{user.bio || "No bio"}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="user_bottom_info">
                            <div className="post_col_left post_col_left_profile">
                                <div className="post_left_header">
                                    <nav>
                                        <ul className="tablist" arial-label="TabPost">
                                            {tabItem.map((tab, i) => {
                                                return (
                                                    <li className={`tablist_item ${currentTab === tab.id ? 'active' : ''}`} key={i}>
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
                                            {isLoading ? (
                                                <div>Loading</div>
                                            ) :
                                                (
                                                    <>
                                                        {tabItem.map((tab, i) => {
                                                            return (
                                                                <div className="post_left_body_macy" id='body-macy' key={i}>
                                                                    {currentTab === tab.id && (tab.content
                                                                        ?
                                                                        <>
                                                                            <PostMasonryLoop Posts={tab.content} User={user} />
                                                                        </>
                                                                        :
                                                                        <Nopost />)}
                                                                </div>
                                                            );
                                                        })}
                                                    </>
                                                )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <ModalFollow />
                {CurrentUser && <ModalEdit />}
            </Main>
        </>
    )
}
