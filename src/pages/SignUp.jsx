import { Header } from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/SignUpStyle.scss";
import { useEffect, useState } from "react";
import { Icon } from "../assets/icon/icons";
import axios from "axios";
import Main from "../ultils/container";
import { API } from "../config";
export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    requiredCheckbox: false,
    optionalCheckbox: false,
  });

  const [error, setError] = useState({});
  const [valid, setValid] = useState(false);
  const [submissionAttempted, setSubmissionAttemped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setDisable] = useState(true);

  useEffect(() => {
    if (submissionAttempted) {
      validate();
    }
  }, [formData, submissionAttempted]);

  const validate = () => {
    const error = {};
    const { email, password, phone, requiredCheckbox, optionalCheckbox } =
      formData;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    const phonePattern = /^\d{10}$/;

    if (!emailPattern.test(email)) {
      error.email = "Invalid Email Address.";
    }
    if (!passwordPattern.test(password)) {
      error.password =
        "Password must be 8-16 characters long, contain an uppercase letter and number.";
    }
    if (!phonePattern.test(phone)) {
      error.phone = "Phone number must be exactly 10 numbers.";
    }
    if (!requiredCheckbox) {
      error.requiredCheckbox = "You must agree to the term of use.";
    }

    setError(error);
    setValid(Object.keys(error).length === 0);
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    if (value.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionAttemped(true);
    // validate();
    if (valid) {
      try {
        const response = await axios.post(`${API}/auth/signup`, {
          username: formData.email.split("@")[0],
          profileName: formData.email.split("@")[0],
          email: formData.email,
          phone: formData.phone,
          isAcceptMarketing: formData.optionalCheckbox,
          password: formData.password
        });
        if(response.status == 200){
          window.location.href = "/login"
        }else{
          alert('opp. we get some error please try again')
        }
      } catch (error) {
        console.error('singup failed:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <Main>
      <div className="container">
        <form onSubmit={handleSubmit} className="formSignup">
          <h4>Join for your experience</h4>

          <div className="email">
            <span>Email Address*</span>
            <input
              id="email"
              placeholder="Example) sufy@sufy.styles.com"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="error">{submissionAttempted && error.email}</span>
          </div>

          <div className="password">
            <span>Password*</span>
            <div className="password-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="8-16 letter containing an uppercase letter and a number"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                className="toggle-password"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (Icon.Hide) : (Icon.Show)}
              </button>
            </div>
            <span className="error">
              {submissionAttempted && error.password}
            </span>
          </div>

          <div className="phone">
            <span>Phone Number*</span>
            <input
              id="phone"
              placeholder="10 number is required"
              value={formData.phone}
              onChange={handleChange}
            />
            <span className="error">{submissionAttempted && error.phone}</span>
          </div>
          <div className="options">
            <div className="required">
              <input
                type="checkbox"
                id="requiredCheckbox"
                checked={formData.requiredCheckbox}
                onChange={handleChange}
              />
              <span>
                [Required] You are agree all{" "}
                <span className="term"> Terms of use </span>?
              </span>
            </div>
            <span className="error">
              {submissionAttempted && error.requiredCheckbox}
            </span>
            <div className="optional">
              <input
                type="checkbox"
                id="optionalCheckbox"
                checked={formData.optionalCheckbox}
                onChange={handleChange}
              />
              <span className="op-child">
                [Optional] I agree to receiving advertising information.
              </span>
            </div>
            <span className="error">
              {submissionAttempted && error.optionalCheckbox}
            </span>
          </div>
          <input
            type="submit"
            value="Sign Up"
            className={`submit ${isDisabled ? "disabled" : ""}`} disabled={isDisabled}
          />

          <span className="ask_account">
            Already have account? <span className="to_login">Log in </span>
          </span>
        </form>
      </div>
    </Main>
  );
}
