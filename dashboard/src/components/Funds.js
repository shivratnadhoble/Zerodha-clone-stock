import React, { useState, useEffect } from "react";

const Funds = () => {
    const [margin, setMargin] = useState(4043.10);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        const savedMargin = localStorage.getItem("accountMargin");
        if (savedMargin) setMargin(parseFloat(savedMargin));
    }, []);

    const handleTransaction = (type) => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return;

        let newMargin = margin;
        if (type === "ADD") {
            newMargin += val;
        } else {
            if (val > margin) return alert("Insufficient funds!");
            newMargin -= val;
        }

        setMargin(newMargin);
        localStorage.setItem("accountMargin", newMargin.toFixed(2));
        setAmount("");
        setShowAddModal(false);
        setShowWithdrawModal(false);
    };

    const handleOpenAccount = () => {
        window.location.href = `${process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"}/signup`;
    };

    return (
        <div className="container mt-4 p-4">
            <div className="funds-header p-4 mb-4 bg-light rounded border d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="mb-1" style={{ fontWeight: 400 }}>Instant fund transfers with UPI</h5>
                    <p className="text-muted small mb-0">Add or withdraw cash directly from your linked bank account.</p>
                </div>
                <div className="d-flex gap-4">
                    <button onClick={() => setShowAddModal(true)} className="btn btn-green p-5 px-4">Add funds</button>
                    <button onClick={() => setShowWithdrawModal(true)} className="btn btn-blue p-5 px-4">Withdraw</button>
                </div>
            </div>

            <div className="row mt-0">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm p-4">
                        <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                            <h6 className="mb-0 text-muted">Equity Balance</h6>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <p className="mb-0">Available margin</p>
                            <h2 className="mb-0 fw-normal" style={{ color: "#4caf50" }}>₹{margin.toLocaleString()}</h2>
                        </div>
                        <div className="fund-details">
                            <DetailRow label="Used margin" value="3,757.30" />
                            <DetailRow label="Available cash" value={margin.toLocaleString()} />
                            <DetailRow label="Opening Balance" value="4,043.10" />
                            <DetailRow label="Payin" value="0.00" />
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 text-center">
                    <div className="commodity p-5 bg-light rounded border">
                        <p className="mb-4">You don't have a commodity account</p>
                        <button onClick={handleOpenAccount} className="btn btn-blue p-3 px-5">Open Account</button>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {(showAddModal || showWithdrawModal) && (
                <div className="modal-overlay">
                    <div className="modal-content shadow">
                        <div className="modal-header">
                            <h5 className="fw-normal">{showAddModal ? "Add Funds" : "Withdraw Funds"}</h5>
                            <button className="btn-close" onClick={() => { setShowAddModal(false); setShowWithdrawModal(false); }} style={{ background: "none", border: "none", fontSize: "1.5rem" }}>&times;</button>
                        </div>
                        <label className="small text-muted mb-2">Enter Amount (₹)</label>
                        <input type="number" className="input-field mb-3" autoFocus placeholder="e.g. 5000" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <div className="modal-footer">
                            <button className="btn btn-light border" onClick={() => { setShowAddModal(false); setShowWithdrawModal(false); }}>Cancel</button>
                            <button className={`btn ${showAddModal ? 'btn-green' : 'btn-blue'}`} onClick={() => handleTransaction(showAddModal ? "ADD" : "WITHDRAW")}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DetailRow = ({ label, value }) => (
    <div className="d-flex justify-content-between py-2 border-bottom">
        <span className="text-muted small">{label}</span>
        <span className="small">₹{value}</span>
    </div>
);

export default Funds;