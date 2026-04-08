import React from 'react';
import { Link } from 'react-router-dom';

function CreateTicket() {
    const categoryStyle = {
        padding: "20px 40px",
        marginBottom: "30px",
    };

    const linkStyle = {
        textDecoration: "none",
        lineHeight: "2.4",
        color: "#387ed1",
        fontSize: "0.95rem",
        display: "block"
    };

    const iconStyle = {
        marginRight: "10px",
        color: "#666",
        fontSize: "1.1rem"
    };

    return (
        <div className="container mt-5 pt-5 pb-5">
            <h1 className="fs-4 mb-5 text-muted" style={{ fontWeight: 300 }}>
                To create a ticket, select a relevant topic
            </h1>
            
            <div className="row">
                {/* Account Opening */}
                <div className="col-lg-4 col-md-6" style={categoryStyle}>
                    <h4 className="fs-5 mb-4"><i className="fa-solid fa-plus-circle" style={iconStyle}></i> Account Opening</h4>
                    <Link to="/signup" style={linkStyle}>Online Account Opening</Link>
                    <Link to="/signup" style={linkStyle}>Offline Account Opening</Link>
                    <Link to="/signup" style={linkStyle}>Company, Partnership and HUF Account Opening</Link>
                    <Link to="/signup" style={linkStyle}>NRI Account Opening</Link>
                    <Link to="/signup" style={linkStyle}>Zerodha IDFC FIRST Bank 3-in-1 Account</Link>
                    <Link to="/signup" style={linkStyle}>Getting Started</Link>
                </div>

                {/* Your Zerodha Account */}
                <div className="col-lg-4 col-md-6" style={categoryStyle}>
                    <h4 className="fs-5 mb-4"><i className="fa-solid fa-user" style={iconStyle}></i> Your Zerodha Account</h4>
                    <Link to="/signup" style={linkStyle}>Login Credentials</Link>
                    <Link to="/signup" style={linkStyle}>Account Modification and Segment Addition</Link>
                    <Link to="/signup" style={linkStyle}>DP ID and bank details</Link>
                    <Link to="/signup" style={linkStyle}>Your Profile</Link>
                    <Link to="/signup" style={linkStyle}>Transfer and conversion of shares</Link>
                </div>

                {/* Trading and Platforms */}
                <div className="col-lg-4 col-md-12" style={categoryStyle}>
                    <h4 className="fs-5 mb-4"><i className="fa-solid fa-money-bill-trend-up" style={iconStyle}></i> Trading and Platforms</h4>
                    <Link to="/signup" style={linkStyle}>Margin/leverage, Product and Order types</Link>
                    <Link to="/signup" style={linkStyle}>Kite Web and Mobile</Link>
                    <Link to="/signup" style={linkStyle}>Trading FAQs</Link>
                    <Link to="/signup" style={linkStyle}>Corporate Actions</Link>
                    <Link to="/signup" style={linkStyle}>Kite API</Link>
                    <Link to="/signup" style={linkStyle}>GTT</Link>
                </div>

                {/* Funds */}
                <div className="col-lg-4 col-md-6" style={categoryStyle}>
                    <h4 className="fs-5 mb-4"><i className="fa-solid fa-wallet" style={iconStyle}></i> Funds</h4>
                    <Link to="/signup" style={linkStyle}>Adding Funds</Link>
                    <Link to="/signup" style={linkStyle}>Offline Account Opening</Link>
                    <Link to="/signup" style={linkStyle}>Fund Withdrawal</Link>
                    <Link to="/signup" style={linkStyle}>eMandates</Link>
                    <Link to="/signup" style={linkStyle}>Adding Bank Accounts</Link>
                </div>

                {/* Console */}
                <div className="col-lg-4 col-md-6" style={categoryStyle}>
                    <h4 className="fs-5 mb-4"><i className="fa-solid fa-circle-notch" style={iconStyle}></i> Console</h4>
                    <Link to="/signup" style={linkStyle}>Reports</Link>
                    <Link to="/signup" style={linkStyle}>Ledger</Link>
                    <Link to="/signup" style={linkStyle}>Portfolio</Link>
                    <Link to="/signup" style={linkStyle}>60 Day Challenge</Link>
                    <Link to="/signup" style={linkStyle}>IPO</Link>
                    <Link to="/signup" style={linkStyle}>Referral Program</Link>
                </div>

                {/* Coin */}
                <div className="col-lg-4 col-md-12" style={categoryStyle}>
                    <h4 className="fs-5 mb-4"><i className="fa-regular fa-circle" style={iconStyle}></i> Coin</h4>
                    <Link to="/signup" style={linkStyle}>Undeerstanding Mutal Funds</Link>
                    <Link to="/signup" style={linkStyle}>About Coin</Link>
                    <Link to="/signup" style={linkStyle}>Buying and Selling through Coin</Link>
                    <Link to="/signup" style={linkStyle}>Starting an SIP</Link>
                    <Link to="/signup" style={linkStyle}>Managing your Portfolio</Link>
                    <Link to="/signup" style={linkStyle}>Government Securities</Link>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;
