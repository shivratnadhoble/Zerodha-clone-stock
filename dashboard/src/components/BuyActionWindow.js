import { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow, orderMode } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handlePlaceOrder = () => {
    if (!stockQuantity || !stockPrice) {
      alert("Please enter valid quantity and price");
      return;
    }
    axios.post("http://localhost:3002/newOrder", {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: orderMode,
    });
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      closeBuyWindow();
    }, 300);
  };

  const isBuyMode = orderMode === "BUY";

  return (
    <div className={`order-window-wrapper ${isVisible ? "visible" : ""}`}>
      <div className="order-backdrop" onClick={handleClose} />

      <div className={`order-window ${isBuyMode ? "buy-active" : "sell-active"}`}>
        <div className="order-header">
          <p>{isBuyMode ? "Buy" : "Sell"} {uid} x {stockQuantity} Qty</p>
          <span className="order-price">₹{stockPrice || "0.00"}</span>
        </div>

        <div className="order-inputs">
          <div className="input-group">
            <label>Qty.</label>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Price</label>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="order-footer">
          <div className="margin-info">
            <span>Margin Required</span>
            <span>₹{(stockQuantity * stockPrice).toFixed(2)}</span>
          </div>
          <div className="action-buttons">
            <button className="btn-main" onClick={handlePlaceOrder}>
              {isBuyMode ? "Buy" : "Sell"}
            </button>
            <button className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
