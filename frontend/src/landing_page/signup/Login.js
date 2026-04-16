import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) => alert(err);
    const handleSuccess = (msg, user) => {
        // Instant redirect for a premium, zero-friction feel
        const params = new URLSearchParams({
            name: user.fullName,
            email: user.email,
            date: user.createdAt
        }).toString();
        window.location.href = `${process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001"}?${params}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"}/login`,
                { ...inputValue },
                { withCredentials: true }
            );
            const { success, message, user } = data;
            if (success) {
                handleSuccess(message, user);
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || "Something went wrong during login");
        }
    };

    return (
        <div className="auth_page">
            <div className="form_container">
                <div className="logo_header">
                    <img src="media/images/logo.svg" alt="App Logo" />
                </div>
                <h2>Welcome Back</h2>
                <p className="subtitle">Sign in to your account to continue</p>
                <form className="auth_form" onSubmit={handleSubmit}>
                    <div className="input_group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="name@example.com"
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="input_group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn_submit">Sign In</button>
                    <div className="auth_footer">
                        <span>New here?</span>
                        <Link to="/signup">Explore more & signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
