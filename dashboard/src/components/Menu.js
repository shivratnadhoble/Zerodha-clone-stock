import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // State to hold user data from URL
    const [userData, setUserData] = useState({
        name: "User Profile",
        email: "Not provided",
        date: "New User"
    });

    useEffect(() => {
        // Parse user data from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get("name");
        const email = urlParams.get("email");
        const date = urlParams.get("date");

        if (name || email) {
            setUserData({
                name: name || "User Profile",
                email: email || "Not provided",
                date: date ? new Date(date).toLocaleDateString() : "New User"
            });
        }
    }, []);

    const handleMenuClick = (index) => {
        setSelectedMenu(index);
    };

    const handleProfileClick = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = () => {
        // Redirection to the Landing Page Login on Port 3000
        window.location.href = `${process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"}/login`;
    };

    // Styling logic
    const menuClass = "menu";
    const activeMenuClass = "menu selected";

    return (
        <div className="menu-container">
            <div className="menus">
                <ul>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/"
                            onClick={() => handleMenuClick(0)}
                        >
                            <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                                Dashboard
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/orders"
                            onClick={() => handleMenuClick(1)}
                        >
                            <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                                Orders
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/holdings"
                            onClick={() => handleMenuClick(2)}
                        >
                            <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                                Holdings
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/positions"
                            onClick={() => handleMenuClick(3)}
                        >
                            <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                                Positions
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/funds"
                            onClick={() => handleMenuClick(4)}
                        >
                            <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                                Funds
                            </p>
                        </Link>
                    </li>
                </ul>
                <div className="profile-section" style={{ position: "relative", marginLeft: "20px" }}>
                    <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <div className="avatar" style={{
                            backgroundColor: "#387ed1",
                            color: "white",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "8px",
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                        }}>
                            {userData.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="username" style={{ margin: 0, fontSize: "0.85rem", fontWeight: 500, color: "#444" }}>{userData.name}</p>
                    </div>

                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown" style={{
                            position: "absolute",
                            top: "100%", // Changed to top: 100% so it opens DOWNWARDS into the screen
                            right: "0",
                            backgroundColor: "white",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                            borderRadius: "12px",
                            padding: "20px",
                            zIndex: 2000,
                            minWidth: "250px",
                            marginTop: "15px", // Spacing from the top bar
                            border: "1px solid #f0f0f0"
                        }}>
                            <div style={{ textAlign: "center", marginBottom: "15px" }}>
                                <div style={{
                                    backgroundColor: "#387ed1",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    margin: "0 auto 10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold"
                                }}>
                                    {userData.name.charAt(0).toUpperCase()}
                                </div>
                                <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1rem" }}>{userData.name}</div>
                                <div style={{ fontSize: "0.85rem", color: "#666" }}>{userData.email}</div>
                            </div>

                            <div style={{
                                padding: "12px 0",
                                borderTop: "1px solid #eee",
                                borderBottom: "1px solid #eee",
                                marginBottom: "15px",
                                textAlign: "center",
                                fontSize: "0.8rem",
                                color: "#888"
                            }}>
                                Member since: <span style={{ color: "#444", fontWeight: 500 }}>{userData.date}</span>
                            </div>

                            <button
                                onClick={handleLogout}
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    color: "white",
                                    backgroundColor: "#d9534f",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: 700,
                                    fontSize: "0.9rem",
                                    transition: "all 0.2s"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#c9302c"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#d9534f"}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;