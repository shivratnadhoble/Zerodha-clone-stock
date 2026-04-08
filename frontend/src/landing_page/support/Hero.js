import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="container-fluid" style={{ backgroundColor: "#387ed1", color: "white" }}>
            <div className="container p-5">
                <div className="d-flex justify-content-between align-items-center mb-5" id="supportWrapper">
                    <h4 className="fs-4">Support Portal</h4>
                    <Link to="/signup" style={{ color: "white", textDecoration: "underline" }}>Track Tickets</Link>
                </div>
                
                <div className="row">
                    <div className="col-lg-7 col-md-12 mb-5">
                        <h1 className="fs-3 mb-4" style={{ fontWeight: 300, lineHeight: "1.6", letterSpacing: "0.2px" }}>
                            Search for an answer or browse help topics to create a ticket
                        </h1>
                        <div className="position-relative">
                            <input 
                                className="form-control p-3 ps-4"
                                style={{ borderRadius: "4px", border: "none", fontSize: "1.1rem" }}
                                placeholder="Eg. how do I activate F&O, Why is my order getting rejected..." 
                            />
                            <i className="fa fa-search position-absolute" style={{ right: "20px", top: "50%", transform: "translateY(-50%)", color: "#666" }}></i>
                        </div>
                        
                        <div className="mt-4 d-flex flex-wrap gap-3">
                            <Link to="/signup" className="text-white">Track account opening</Link>
                            <Link to="/signup" className="text-white">Track segment activation</Link>
                            <Link to="/signup" className="text-white">Intraday margins</Link>
                            <Link to="/signup" className="text-white">Kite user manual</Link>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-12 ps-lg-5">
                        <h1 className="fs-3 mb-4" style={{ fontWeight: 400 }}>Featured</h1>
                        <ol className="ps-3" style={{ lineHeight: "2.2" }}>
                            <li className="mb-2">
                                <Link to="/signup" className="text-white">Latest Intraday leverages - MIS & CO</Link>
                            </li>
                            <li>
                                <Link to="/signup" className="text-white">Current Takeovers and Delisting - January 2024</Link>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
