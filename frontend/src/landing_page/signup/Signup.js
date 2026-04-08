import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
        fullName: "",
    });
    const { email, password, username, fullName } = inputValue;
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) => alert(err);
    const handleSuccess = (msg) => {
        alert(msg);
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:3002/signup",
                { ...inputValue },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || "Something went wrong during signup");
        }
    };

    return (
        <div className="auth_page">
            <div className="form_container">
                <div className="logo_header">
                    <img src="media/images/logo.svg" alt="App Logo" />
                </div>
                <h2>Create Account</h2>
                <p className="subtitle">Join thousands of smart investors today</p>
                <form className="auth_form" onSubmit={handleSubmit}>
                    <div className="input_group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            placeholder="e.g. John Doe"
                            onChange={handleOnChange}
                            required
                        />
                    </div>
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
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            placeholder="choose a unique username"
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
                            placeholder="at least 6 characters"
                            onChange={handleOnChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <button type="submit" className="btn_submit">Get Started</button>
                    <div className="auth_footer">
                        <span>Already have an account?</span>
                        <Link to="/login">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
