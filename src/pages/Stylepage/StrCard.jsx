import Card from "react-bootstrap/Card";
import "../../assets/styles/Style.scss";

const StrCard = ({ name, avt, imgURL }) => {
  const isVideo = (url) => {
    const videoExtensions = ["mp4", "webm", "ogg"];
    const extension = url.split(".").pop();
    return videoExtensions.includes(extension);
  };
  return (
    <div className="card-container">
      <div className="img-container">
        {isVideo(imgURL) ? (
          <video controls className="img">
            <source src={imgURL} type={`video/${imgURL.split(".").pop()}`} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Card.Img variant="top" src={imgURL} className="img" />
        )}
        <div className="overlay">
          <div>
            <button className="avt">
              <img src={avt} alt="Avatar" />
            </button>
          </div>

          <div>
            <Card.Title className="name">{name}</Card.Title>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrCard;