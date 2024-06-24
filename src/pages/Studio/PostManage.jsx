import React from 'react'
import { HeaderforStudio } from '../../components/Header'
import "../../assets/styles/postManage.scss"
import { Icon } from '../../assets/icon/icons';
import { ButtonStyle1 as Button } from '../../components/button';
import { PostLoopTab } from "../../components/Post_loop";
import { Post_Image,Post_Videos,Post_Archived } from '../../Test/Jsontest';

function Nopost() {
  return (
    <div className="nopost_container">
      <div className="nopost_content">
        <div className="nopost_content_icon">
          {Icon.NoPostIcon}
        </div>
        <div className="nopost_content_text">
          <h2 className="nopost_content_title">Upload your first post</h2>
          <p className="nopost_content_description">Your posts will appear here</p>
        </div>
      </div>
    </div>)
}
export default function PostManage() {
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
    }
  ];
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  }
  return (
    <>
      <HeaderforStudio />
      <main className="post_main">
        <div className="post_container container">
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
                        {currentTab === `${tab.id}` && (tab.content.length != 0 ? <PostLoopTab Posts={tab.content}/> : <Nopost/>)}
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
              <Button link="/studio/post/upload" content="Upload" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

