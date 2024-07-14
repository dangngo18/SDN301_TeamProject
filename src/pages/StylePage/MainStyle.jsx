import { useState, useEffect, useMemo } from "react";
import Main from "../../ultils/container";
import { Mainstyle_tabbar_Item } from "../../config";
import {
  PostFeatureStoryLoop,
  StyleMasonryLoop,
} from "../../components/Post_loop";
import { API } from "../../config";

export default function MainStyle() {
  const [currentTab, setCurrentTab] = useState(1);
  const [StoryPost, setStoryPost] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(1);
  const [MansoryPost, setMansoryPost] = useState([]);
  const [loadingStory, setLoadingStory] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  const filterPost = [
    { filterid: 1, title: "popular", function: 1 },
    { filterid: 2, title: "newest", function: 2 },
  ];

  useEffect(() => {
    const fetchPost = async () => {
      setLoadingPost(true);
      try {
        const response = await fetch(`${API}/style/posts/all`, {
          method: "GET",
        });
        const data = await response.json();
        setMansoryPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingPost(false);
      }
    };

    const fetchStory = async () => {
      setLoadingStory(true);
      try {
        const response = await fetch(`${API}/style/posts/story/`, {
          method: "GET",
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
  }, []);

  const getFilteredPosts = useMemo(() => {
    if (currentFilter === 1) {
      return [...MansoryPost]
        .sort((a, b) => (b.viewNumber + b.likeList) - (a.viewNumber + a.likeList));;
    } else if (currentFilter === 2) {
      return [...MansoryPost].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      return MansoryPost;
    }
  }, [currentFilter, MansoryPost]);

  return (
    <Main>
      <main className="MainStyle_container">
        <div className="style_subheader">
          <h2 className="style_subheader_title">Style</h2>
          <nav className="style_subheader_tabbar">
            <ul className="style_subheader_tabbar_list container">
              {Mainstyle_tabbar_Item.map((item, index) => (
                <li
                  key={index}
                  className={`style_subheader_tabbar_item ${currentTab === item.id && "active"
                    }`}
                  onClick={() => setCurrentTab(item.id)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="style_container container">
          <div className="style_list_feature1 post_attractment">
            {loadingStory ? (
              <div>Loading Story...</div>
            ) : (
              <PostFeatureStoryLoop Posts={StoryPost} />
            )}
          </div>
          <div className="style_list_feature2 post_by_tab">
            <div className="style_list_feature2_header">
              <ul>
                {filterPost.map((tab, i) => (
                  <li
                    className={`header_ul_item ${currentFilter === tab.filterid && "active"
                      }`}
                    key={i}
                    onClick={() => setCurrentFilter(tab.filterid)}
                  >
                    {tab.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="style_list_feature2_body">
              {loadingPost ? (
                <div>Loading Post...</div>
              ) : (
                <StyleMasonryLoop Posts={getFilteredPosts} />
              )}
            </div>
          </div>
        </div>
      </main>
    </Main>
  );
}
