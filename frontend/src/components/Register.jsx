import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await registerUser(formData);
      toast.success(response.data.message);
      localStorage.setItem("userinfo", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.headers["auth-token"]);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="register">
      <form className="register_form" onSubmit={handleSubmit}>
        <div className="register_name_component">
          <label htmlFor="name" className="register_label">Name: </label>
          <input
            type="text"
            name="name"
            className="register_input name_input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register_email_component">
          <label htmlFor="email" className="register_label">Email: </label>
          <input
            type="email"
            name="email"
            className="register_input email_input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register_password_component">
          <label htmlFor="password" className="register_label">Password: </label>
          <span className="password_input_wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="register_input password_input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password show_password_button"
            >
              {showPassword ? (
                <i className="fas fa-eye"></i>
              ) : (
                <i className="fas fa-eye-slash"></i>
              )}
            </button>
          </span>
        </div>

        <div className="register_confirmpassword_component">
          <label htmlFor="confirmPassword" className="register_label">Confirm Password: </label>
          <span className="confirm_password_input_wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="register_input confirm_password_input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="toggle-password show_confirm_password_button"
            >
              {showConfirmPassword ? (
                <i className="fas fa-eye"></i>
              ) : (
                <i className="fas fa-eye-slash"></i>
              )}
            </button>
          </span>
        </div>

        <button type="submit" className="register_submit_button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
