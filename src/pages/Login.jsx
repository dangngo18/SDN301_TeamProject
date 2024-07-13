import React, { useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/SignUpStyle.scss";
import { Icon } from "../assets/icon/icons";
import { API, Logo } from '../config'
import { validateEmail, validatePassword } from "../ultils/validation";
import axios from "axios";
import Main from "../ultils/container";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isDisabled, setDisable] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let flag = false;
    if (validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      flag = true;
    }
    if (validatePassword(formData.password)) {
      alert("Please enter a valid password");
      flag = true;
    }
    if (flag) {
    } else {
      try {
        const response = await axios.post(`${API}/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        console.log('Login successful');
        const { token, userId } = response.data;
        console.log(response.data);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
      }
    }


  };

  const handleGoogleLogin = () => {
    // Logic for handling Google login
    console.log("Login with Google");
    // Implement your Google login logic here
  };

  return (
    <>
      <Main>
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
                    <input type="email" name="email" id="email" placeholder="e.g sufy@sufystyles.com" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="login_input_row">
                    <h3>Password</h3>
                    <input type="password" name="password" id="password" placeholder="enter your password" value={formData.password} onChange={handleChange} />
                  </div>
                </div>
                <button className={`login_btn_submit btn_style1 ${isDisabled ? "disabled" : ""}`} disabled={isDisabled} type="submit" onClick={handleLogin}>Login</button>
                <ul className="additional_link_list">
                  <li className="additional_link_item"><a href="/signup">Email Sign Up</a></li>
                  <li className="additional_link_item"><a href="/findemail">Find Your Email</a></li>
                  <li className="additional_link_item"><a href="/forgotpass">Forgot Password</a></li>
                </ul>
                <div className="additional_login_select">
                  <button className="additional_login_option" onClick={handleGoogleLogin}>{Icon.Google} Log in with google</button>
                  <button className="additional_login_option" onClick={handleGoogleLogin}>{Icon.Facebook} Sign in with facebook</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </Main>
    </>
  );
};

export default Login;