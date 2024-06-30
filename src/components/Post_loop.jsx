import { Icon } from "../assets/icon/icons";
import Card from "react-bootstrap/Card";
import React, { useRef, useMemo, useEffect, useState } from "react";
import "../assets/styles/Style.scss";
import Macy from "macy";

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
  return Posts.map((post, index) => {
    return (
      <div key={index} className="Post_card1">
        <a href={`/post/id:${post.id}`}>
          <div className="Post_card1_img">
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
    );
  });
}

export function StylePostMasonryLoop({ children, Posts }) {
  const containerRef = useRef();
  const childCount = React.Children.count(children);
  const options = useMemo(
    () => ({
      // columns: 3,
      margin: {
        x: 25,
        y: 44,
      },
      breakAt: {
        1215: 4,
        // 1214: 3,
        992: 3,
        520: 2,
        400: 1,
      },
    }),
    []
  );

  const isVideo = (url) => {
    const videoExtensions = ["mp4", "webm", "ogg"];
    const extension = url.split(".").pop();
    return videoExtensions.includes(extension);
  };

  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    setIsRed(!isRed);
  };
  const { macy } = useMasonry(containerRef, options, childCount);
  return (
    <div ref={containerRef} className="post_left_body_macy_inner">
      {Posts.map((post, index) => {
        return (
          <div className="postContainer" key={index}>
            <div className="postCard-container">
              {isVideo(post.imgURL) ? (
                <video controls className="postVid-container">
                  <source
                    src={post.imgURL}
                    type={`video/${post.imgURL.split(".").pop()}`}
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Card.Img
                  variant="top"
                  src={post.imgURL}
                  className="postImg-container"
                />
              )}

              <Card.Body>
                <Card.Title className="postTitle">
                  <button className="postButton">
                    <img src={post.avt} className="postAvt" />
                    <span className="postName">{post.name}</span>
                  </button>
                  <span className="postLover">
                    <button
                      className="postIcon"
                      onClick={handleClick}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fill: isRed ? "#ff385c" : "#6a6a6a" }}>
                        {Icon.Love}
                      </span>
                    </button>
                    <span>{post.lover}</span>
                  </span>
                </Card.Title>

                <Card.Text className="postText">{post.title}</Card.Text>
              </Card.Body>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function formatNumber(number) {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + "T";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
}
