import React, { useRef, useMemo, useEffect } from 'react'
import { Icon } from '../assets/icon/icons'
import Macy from 'macy';

export const useMasonry = (containerRef, options, childCount) => {
  const macyRef = useRef();

  useEffect(() => {
    const macyOptions = {
      container: containerRef.current,
      ...options,
    };

    macyRef.current = Macy(macyOptions);

    return () => {
      macyRef.current.remove();
    };
  }, [options, containerRef]);

  useEffect(() => {
    macyRef.current.reInit();
  }, [childCount]);

  return { macy: macyRef.current };
};

export function PostLoopTab({ Posts }) {
  return (
    Posts.map((post, index) => {
      return (
        <div key={index} className='Post_card1'>
          <a href={`/studio/post/${post.id}`}>
            <div className='Post_card1_img'>
              <picture>
                <img src={post.image[0].url} alt="" />
              </picture>
              <div className="Post_card1_img_likeNumber">
                {Icon.Heart}
                <span>{formatNumber(post.like_number)}</span>
              </div>
              <span className="imageType">
                {post.image.length > 1 ? Icon.MultiImage : ""}
                {post.type === 1 ? Icon.PlayIcon : ""}
              </span>
            </div>
          </a>
        </div>
      )
    }
    )
  );
}
export function PostMasonryLoop({ children, Posts, User }) {
  const containerRef = useRef();
  const childCount = React.Children.count(children);
  const options = useMemo(
    () => ({
      // columns: 3,
      margin: {
        x: 25,
        y: 44  
      },
      breakAt: {
        1215:4,
        // 1214: 3,
        992: 3,
        520: 2,
        400: 1,
      },
    }),
    []
  );
  const { macy } = useMasonry(containerRef, options, childCount);
  return (
    <div ref={containerRef} className='post_left_body_macy_inner'>
      {
        Posts.map((post, index) => {
          return (
            <div key={index} className='Post_card1'>
              <a href={`/studio/post/${post.id}`}>
                <div className='Post_card1_img'>
                  <picture>
                    <img src={post.image[0].url} alt="" className={post.image[0].aspect} />
                  </picture>

                  <div className="Post_card1_img_viewed">
                    {Icon.ViewIcon}
                    <span>{formatNumber(post.viewed)}</span>
                  </div>
                  <span className="imageType">
                    {post.image.length > 1 ? Icon.MultiImage : ""}
                    {post.type === 1 ? Icon.PlayIcon : ""}
                  </span>
                </div>
              </a>
              <div className="Post_card1_data">
                <a href={`/user/profile/${User.id}`} className="user_data">
                  <picture>
                    <img src={User.urlImage} alt="" />
                  </picture>
                  <span>{User.name}</span>
                </a>
                <div className='likeNumber'>
                  {Icon.Heart}
                  <span>{formatNumber(post.like_number)}</span>
                </div>
              </div>
              <p className="Post_card1_content">
                {post.title} {post.description}
              </p>
            </div>
          )
        }
        )
      }
    </div>
  );
}

export function Nopost() {
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
function formatNumber(number) {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + 'T';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}