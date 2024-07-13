import React, { useEffect, useContext } from 'react'
import { HeaderforStudio } from '../../components/Header'
import "../../assets/styles/postManage.scss"
import { Icon } from '../../assets/icon/icons';
import { ButtonStyle1 as Button } from '../../components/button';
import { PostLoopTab,Nopost } from "../../components/Post_loop";
import { Post_Image, Post_Videos, Post_Archived } from '../../Test/Jsontest';
import Main from '../../ultils/container';
import {API,token} from '../../config'
import { SessionContext } from '../../Context';

export default function PostManage() {
  const [currentTab, setCurrentTab] = React.useState('1');
  const [post, setPost] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useContext(SessionContext);

  useEffect(() => {
    let mounted = false;
    if(!mounted){
      const fetchPosts = async () => {
        setIsLoading(true);
        const response = await fetch(`${API}/studio/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if(response.status == 401){
          window.localStorage.clear();
          window.location.href = "/login"
        }
        const data = await response.json();
        setPost(data);
        setIsLoading(false);
      }
      fetchPosts();
    }
    return () => mounted = true;
  }, [])
  const tabItem = [
    {
      id: 1,
      tab: "Image",
      content: post.filter((post) => post.urlVideo == null && post.image.length > 0 && post.isVisible == true)
    },
    {
      id: 2,
      tab: "Videos",
      content: post.filter((post) => post.urlVideo != null && post.image.length == 0 && post.isVisible == true)
    },
    {
      id: 3,
      tab: "Archived",
      content: post.filter((post) => post.isVisible == false)
    }
  ];
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  }
  return (
    <>
      <Main>

        <main className="post_main">
          <div className="post_container container">
            <div className="post_col_left">
              <div className="post_left_header">
                <nav>
                  <ul className="tablist" arial-label="TabPost">
                    {tabItem.map((tab, i) => {
                      return (
                        <li className={`tablist_item ${currentTab === `${tab.id}` ? 'active' : ''}`} key={i}>
                          <input type="button" id={tab.id} onClick={(handleTabClick)} value={`${tab.tab} ${tab.content != null ? tab.content.length : "0"}`} />
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="filter_tab">
                  Filter by
                  <span>
                    {Icon.FilterIcon}
                  </span>
                </div>
              </div>
              <div className="post_left_body">
                <div className="post_left_body_container">
                  <div className="post_left_body_wrapper">
                    {tabItem.map((tab, i) => {
                      return (
                        <div className="post_left_body_item" key={i}>
                          {currentTab === `${tab.id}` && (tab.content != null ? <>{tab.content.length > 0 ? <PostLoopTab Posts={tab.content} /> : <Nopost />}</> : <Nopost />)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="post_col_right">
              <div className="post_right_profile">
                <div className="post_right_profile_info">
                  <picture className="post_right_profile-img">
                    <img src={user.urlImage} alt="avatar" />
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
                  <div className="profile_dashboard_item">
                    Posts
                    <span>{post.length}</span>
                  </div>
                </div>
              </div>
              <div className="post_right_btn_action">
                <Button link="/studio/post/upload" content="Upload" />
              </div>
            </div>
          </div>
        </main>
      </Main>
    </>
  )
}

