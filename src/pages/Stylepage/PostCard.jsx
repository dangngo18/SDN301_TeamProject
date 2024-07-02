import "../../assets/styles/Style.scss";
import Card from "react-bootstrap/Card";
import { Icon } from "../../assets/icon/icons";
import { useState } from "react";

const PostCard = ({ name, title, avt, image, type, lover }) => {
  const isVideo = (url) => {
    const videoExtensions = ["mp4", "webm", "ogg"];
    const extension = url.split(".").pop();
    return videoExtensions.includes(extension);
  };

  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    setIsRed(!isRed);
  };

  return (
    <div className="postContainer">
      <div className="postCard-container">
        <div className="media-container">
          {isVideo(image) ? (
            <video controls className="postVid-container">
              <source
                src={image[0].url}
                type={`video/${image.split(".").pop()}`}
                className={image[0].aspect}
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Card.Img
              variant="top"
              src={image[0].aspect}
              className="postImg-container"
            />
          )}

          <div className="overlay">
            {image.length > 1 ? Icon.MultiImage : ""}
            {type === 1 ? Icon.PlayIcon : ""}
          </div>
        </div>

        <Card.Body>
          <Card.Title className="postTitle">
            <button className="postButton">
              <img src={avt} className="postAvt" />
              <span className="postName">{name}</span>
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
              <span>{lover}</span>
            </span>
          </Card.Title>

          <Card.Text className="postText">{title}</Card.Text>
        </Card.Body>
      </div>
    </div>
  );
};

export default PostCard;
