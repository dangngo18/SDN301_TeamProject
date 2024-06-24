import React, { useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/LoginStyle.scss"; // Ensure this path is correct

const Login = () => {
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
    <div className="container"> {/* Ensure this div has 'container' class for styling */}
      <Header />
      <form>
        <h4>Đăng nhập</h4>
        <div className="email">
          <span>Email:</span>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="password">
          <span>Mật khẩu:</span>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="submit" onClick={handleLogin}>
          Login
        </button>
        <div className="additional-links">
          <p>Email Sign Up</p>
          <p>Find your email</p>
          <p>Forgot password</p>
        </div>
        <button className="submit google-login" onClick={handleGoogleLogin}>
        Login With Google
        </button>
        <button className="submit google-login" onClick={handleGoogleLogin}>
        Login With Facebook
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
