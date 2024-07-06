import React, { useState, useEffect } from 'react'
import Main from '../../ultils/container'
import { Mainstyle_tabbar_Item } from '../../config'
import { Post_Image } from '../../Test/Jsontest';
import { PostFeatureStoryLoop, StyleMasonryLoop } from '../../components/Post_loop';
import { API } from '../../config';

export default function MainStyle() {
  const [currentTab, setCurrentTab] = useState(1);
  const [StoryPost, setStoryPost] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(1);
  const [MansoryPost, setMansoryPost] = useState([]);
  const [loadingStory, setLoadingStory] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const filterPost = [
    {
      filterid: 1,
      title: "popular",
      function: "",
    }, {
      filterid: 2,
      title: "newest",
      function: "",
    }
  ]

  useEffect(() => {

    const fetchPost = async () => {
      setLoadingPost(true);
      try {
        const response = await fetch(`${API}/style/posts/all`, {
          method: "GET"
        })
        const data = await response.json();
        console.log(data);
        setMansoryPost(data);
      } catch (err) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingPost(false);
      }
    }
    const fetchStory = async () => {
      setLoadingStory(true);
      try {
        const response = await fetch(`${API}/style/posts/story/`, {
          method: "GET"
        });
        const data = await response.json();
        setStoryPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingStory(false);
      }
    };
    fetchStory();
    fetchPost();
  }, [])


  return (
    <Main>
      <main className='MainStyle_container'>

        <div className="style_subheader">
          <h2 className="style_subheader_title">Style</h2>
          <nav className="style_subheader_tabbar">
            <ul className="style_subheader_tabbar_list container">
              {Mainstyle_tabbar_Item.map((item, index) => {
                return (
                  <li key={index} className={`style_subheader_tabbar_item ${currentTab === item.id && 'active'}`} onClick={() => setCurrentTab(item.id)}>{item.icon}<span>{item.title}</span></li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="style_container container">
          <div className="style_list_feature1 post_attractment">
            {
              loadingStory ? (
                <>
                  <div>Loading</div>
                </>) :
                (
                  <PostFeatureStoryLoop Posts={StoryPost} />
                )
            }
          </div>
          <div className="style_list_feature2 post_by_tab">
            <div className="style_list_feature2_header">
              <ul>
                {filterPost.map((tab, i) => {
                  return (
                    <li className={`header_ul_item ${currentFilter === tab.filterid && 'active'}`} key={i} onClick={() => setCurrentFilter(tab.filterid)}>{tab.title}</li>
                  )
                })}
              </ul>
            </div>
            <div className="style_list_feature2_body">
              {loadingPost ? (
                <>
                  <div>Loading</div>
                </>) :
                (
                  <StyleMasonryLoop Posts={MansoryPost} />
                )}
            </div>
          </div>
        </div>
      </main>
    </Main>
  )
}
