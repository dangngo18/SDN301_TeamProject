import React, { Fragment } from "react";
import { HeaderAfterLogin } from "../components/Header";
import Footer from '../components/Footer'
import "../assets/styles/profile.scss";
import Modal from "../components/EditProfileModal";

export default function Profile() {
  return (
    <Fragment>
      <div>
        <HeaderAfterLogin />
        <div className="container">
          <div className="Profile flex">
            <img className="avatar" src="./img/OIP.png" alt="" />
            <div className="infoProfile">
              <div className="name_edit flex">
                <div className="username">Canisdang</div>
                <button className="button_editProfile flex">
                  <svg className="edit-symbol" xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M2.54594 13.9995H11.3143C11.8577 13.998 12.3784 13.7806 12.7619 13.3952C13.1455 13.0097 13.3607 12.4877 13.3602 11.9435V7.53251C13.3602 7.3773 13.2986 7.22844 13.189 7.11868C13.0794 7.00892 12.9307 6.94726 12.7757 6.94726C12.6206 6.94726 12.4719 7.00892 12.3623 7.11868C12.2527 7.22844 12.1911 7.3773 12.1911 7.53251V11.9435C12.1919 12.1773 12.1 12.4018 11.9356 12.5678C11.7712 12.7339 11.5478 12.8278 11.3143 12.829H2.54594C2.31246 12.8278 2.089 12.7339 1.92461 12.5678C1.76022 12.4018 1.66833 12.1773 1.66911 11.9435V3.18001C1.66833 2.94624 1.76022 2.72172 1.92461 2.55571C2.089 2.38969 2.31246 2.29576 2.54594 2.29452H6.93011C7.08514 2.29452 7.23382 2.23286 7.34345 2.12311C7.45307 2.01335 7.51466 1.86449 7.51466 1.70927C7.51466 1.55406 7.45307 1.40519 7.34345 1.29544C7.23382 1.18568 7.08514 1.12402 6.93011 1.12402H2.54594C2.00248 1.12557 1.48184 1.34293 1.09827 1.72838C0.714696 2.11383 0.499534 2.6359 0.500001 3.18001V11.9435C0.499534 12.4877 0.714696 13.0097 1.09827 13.3952C1.48184 13.7806 2.00248 13.998 2.54594 13.9995Z" fill="black" />
                    <path d="M6.02686 6.12493L5.56564 8.24002C5.54477 8.33596 5.54834 8.43561 5.57602 8.52981C5.6037 8.624 5.65461 8.70971 5.72406 8.77904C5.79446 8.84662 5.8801 8.89622 5.97372 8.92362C6.06733 8.95103 6.16617 8.95544 6.26185 8.93647L8.36975 8.47354C8.4792 8.44947 8.57944 8.39442 8.65852 8.31493L13.9862 2.98096C14.149 2.81792 14.2782 2.62436 14.3664 2.41132C14.4545 2.19828 14.4999 1.96995 14.4999 1.73935C14.4999 1.50876 14.4545 1.28043 14.3664 1.06739C14.2782 0.854351 14.149 0.660786 13.9862 0.497745C13.6522 0.178278 13.2082 0 12.7463 0C12.2845 0 11.8404 0.178278 11.5065 0.497745L6.18703 5.83698C6.10719 5.91562 6.05159 6.01557 6.02686 6.12493ZM12.333 1.32587C12.4442 1.21921 12.5923 1.15966 12.7463 1.15966C12.9003 1.15966 13.0484 1.21921 13.1596 1.32587C13.2677 1.43627 13.3283 1.58473 13.3283 1.73935C13.3283 1.89398 13.2677 2.04244 13.1596 2.15283L12.7463 2.56661L11.9198 1.73906L12.333 1.32587ZM7.1305 6.5428L11.0903 2.56836L11.9086 3.39181L7.94712 7.36741L6.89784 7.598L7.1305 6.5428Z" fill="black" />
                  </svg>
                  Edit Profile
                </button>
              </div>
              <div className="infoFollow flex">
                <div className="followers">Followers</div>
                <div className="number-follow">2,904</div>
                <div className="following">Following </div>
                <div className="number-follow">166</div>
              </div>
              <div className="story followers">My instagram @h_dang</div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="first">
            <div className="toolbar flex">
              <div className="animation flex">
                <div>Post</div>
                <div>139</div>
              </div>
              <div className="animation flex">
                <div>Videos</div>
                <div>14</div>
              </div>
              <div className="animation flex">
                <div>Saved</div>
                <div>20</div>
              </div>
              <div className="animation flex">
                <div>Tag products</div>
                <div>14</div>
              </div>
            </div>
          </div>
          <div className="second">
            <div className="content flex">
              <img src="./img/people.png" alt="" />
              <div className="invite-post">Upload your first post</div>
              <div className="notification">Your posts will appear here</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Modal/>
    </Fragment>
  );
}
