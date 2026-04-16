import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Summary = () => {
    const [allHoldings, setAllHoldings] = useState([]);
    const [margin, setMargin] = useState(4043.10);
    const location = useLocation();
    
    // Extract user profile from the URL shared across Port 3000 -> 3001
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get("name") || "Investor";

    useEffect(() => {
        // Fetch real market holdings
        axios.get(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"}/allHoldings`).then((res) => {
            setAllHoldings(res.data);
        });

        // Sync with common storage
        const savedMargin = localStorage.getItem("accountMargin");
        if (savedMargin) {
            setMargin(parseFloat(savedMargin));
        }
    }, [location.search]);

    const totalInvestment = allHoldings.reduce((acc, stock) => acc + (stock.avg * stock.qty || 0), 0);
    const currentValue = allHoldings.reduce((acc, stock) => acc + (stock.price * stock.qty || 0), 0);
    const pnl = currentValue - totalInvestment;
    const pnlPercent = (pnl / (totalInvestment || 1)) * 100;

    return (
        <div className="summary-container p-4">
            <div className="username mb-5">
                <h6>Hi, {userName}!</h6>
                <hr className="divider" />
            </div>

            <div className="row">
                <div className="col">
                    <span>
                        <p>Equity</p>
                    </span>
                    <div className="data d-flex align-items-center justify-content-between mt-3">
                        <div className="first">
                            <h3 className="fw-normal">₹{margin.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                            <p className="text-muted small">Margin available</p>
                        </div>
                        <div className="second text-end">
                            <p className="small mb-0">Margins used <span className="text-dark">0.00</span></p>
                            <p className="small mb-0">Opening balance <span className="text-dark">₹4,043.10</span></p>
                        </div>
                    </div>
                    <hr className="divider" />
                </div>

                <div className="col">
                    <span>
                        <p>Holdings ({allHoldings.length})</p>
                    </span>
                    <div className="data d-flex align-items-center justify-content-between mt-3">
                        <div className="first">
                            <h3 className={`fw-normal ${pnl >= 0 ? "profit" : "loss"}`}>
                                {pnl >= 0 ? "+" : ""}
                                {pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                <small style={{ marginLeft: "10px", fontSize: "0.8rem" }}>
                                    {pnl >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%
                                </small>
                            </h3>
                            <p className="text-muted small">Total P&L</p>
                        </div>
                        <div className="second text-end">
                            <p className="small mb-0">Current Value <span className="text-dark">₹{currentValue.toLocaleString()}</span></p>
                            <p className="small mb-0">Investment <span className="text-dark">₹{totalInvestment.toLocaleString()}</span></p>
                        </div>
                    </div>
                    <hr className="divider" />
                </div>
            </div>
        </div>
    );
};

export default Summary;