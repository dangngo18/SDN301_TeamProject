import React from 'react'
import { HeaderforStyle } from '../../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import { userInfo } from '../../Test/Jsontest'
import { Icon } from '../../assets/icon/icons'
import '../../assets/styles/User.scss'
import { PostLoopTab2, Nopost } from '../../components/Post_loop'
import { Post_Image, Post_Videos, Post_Archived } from '../../Test/Jsontest'

function ModalFollow({followList}){
return(
    <>
    <div className="follow_layout">
        <div className="follow_container">
             <div className="follow_header"></div>
             <div className="follow_body">
                <nav className="follow_tabbar"></nav>
                <div className="follow_list"></div>
             </div>
        </div>
        <div className="follow_bg"></div>
    </div>
    </>
)
}

export default function UserProfile() {
    const { id, name, username, bio, email, urlImage, following, followers, posts, tag_product } = userInfo
    const [currentTab, setCurrentTab] = React.useState('1');
    const tabItem = [
        {
            id: 1,
            tab: "Image",
            content: Post_Image
        },
        {
            id: 2,
            tab: "Videos",
            content: Post_Videos
        },
        {
            id: 3,
            tab: "Archived",
            content: Post_Archived
        },
        {
            id:4,
            tab:"tag_products",
            content:tag_product
        }
    ];
    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
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
                                <h2>{name}</h2>
                                <div className="upload_button">
                                    <button ><span>{Icon.EditIcon}</span>Edit profile</button>
                                </div>
                            </div>
                            <ul className="top_info_data_followList">
                                <li className="followList_item">Followers <span>{followers.length}</span></li>
                                <li className="followList_item">Following <span>{following.length}</span></li>
                            </ul>
                            <div className="top_info_data_bio">
                                <p>{bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className="user_bottom_info">
                        <div className="post_col_left">
                            <div className="post_left_header">
                                <nav>
                                    <ul className="tablist" arial-label="TabPost">
                                        {tabItem.map((tab, i) => {
                                            return (
                                                <li className={`tablist_item ${currentTab === `${tab.id}` ? 'active' : ''}`} key={i}>
                                                    <input type="button" id={tab.id} onClick={(handleTabClick)} value={`${tab.tab} ${tab.content.length}`} />
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
                                            return (
                                                <div className="post_left_body_item" key={i}>
                                                    {currentTab === `${tab.id}` && (tab.content.length != 0 ? <PostLoopTab2 Posts={tab.content} /> : <Nopost />)}
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
            <Footer />
        </>
    )
}
