import React, { useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/SignUpStyle.scss";
import { Icon } from "../assets/icon/icons";
import {Logo} from '../config'

const Login = () => {
  const [isDisabled,setDisable] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = () => {
    // Logic for handling login
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    // Implement your login logic here
  };

  const handleGoogleLogin = () => {
    // Logic for handling Google login
    console.log("Login with Google");
    // Implement your Google login logic here
  };

  return (
    <>
      <Header />
      <main className="login_main">
         <div className="login_container">
            <div className="login_header">
                <picture>
                  <img src={Logo} alt="" />
                </picture>
                <span>Surf your styles</span>
            </div>
            <div className="login_form">
              <form>
                <div className="login_local_input">
                  <div className="login_input_row">
                    <h3>Email Address</h3>
                    <input type="email" name="email" id="email-input" placeholder="e.g sufy@sufystyles.com" value={formData.email} onChange={handleChange}/>
                  </div>
                  <div className="login_input_row">
                    <h3>Password</h3>
                    <input type="password" name="password" id="password-input" placeholder="enter your password" value={formData.password} onChange={handleChange}/>
                  </div>
                </div>
                <button className={`login_btn_submit btn_style1 ${isDisabled ? "disabled" : ""}`} disabled={isDisabled} type="submit" onClick={handleLogin}>Login</button>
                <ul className="additional_link_list">
                  <li className="additional_link_item"><a href="">Email Sign Up</a></li>
                  <li className="additional_link_item"><a href="">Find Your Email</a></li>
                  <li className="additional_link_item"><a href="">Forgot Password</a></li>
                </ul>
                <div className="additional_login_select">
                  <button className="additional_login_option" onClick={handleGoogleLogin}>{Icon.Google} Log in with google</button>
                  <button className="additional_login_option" onClick={handleGoogleLogin}>{Icon.FaceBook} Sign in with facebook</button>
                </div>
              </form>
            </div>
         </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;