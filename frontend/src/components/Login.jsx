import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      toast.success(response.data.message);
      localStorage.setItem("userinfo", JSON.stringify(response.data.user));
      navigate("/dashboard");
      console.log(response);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="login">
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="login_email_component">
          <label htmlFor="email" className="login_label">Email: </label>
          <input
            type="email"
            name="email"
            className="login_input email_input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login_password_component">
          <label htmlFor="password" className="login_label">Password: </label>
          <span className="password_input_wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="login_input password_input"
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

        <button type="submit" className="login_submit_button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
