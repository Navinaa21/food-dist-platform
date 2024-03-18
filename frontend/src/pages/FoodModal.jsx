// FoodModal.js
// FoodModal.js
import React, { useState } from "react";
import "./FoodModal.css"; // create a CSS file for styling


const FoodModal = ({ image, foodName, donorName, contact, location, quantity, email, foodType, condition, onClose ,onDelete}) => {
  const [isFullSize, setIsFullSize] = useState(false);
  const toggleFullSize = () => {
    setIsFullSize(!isFullSize);
  };

  const handleDelete = () => {
    onClose(); // Close the modal after deletion
    onDelete(foodName,email); // You can adjust the parameters as needed
    
    
    
  };
  return (
    <div className="food-modal">
      <div className={`modal-content ${isFullSize ? "full-size" : ""}`} onClick={(e) => e.stopPropagation()}>
        <img src={image} alt={foodName} onClick={toggleFullSize} />
        <h3>{foodName}</h3>
        <p>Donor: {donorName}</p>
        <p>Contact: {contact}</p>
        <p>Location: {location}</p>
        <p>Quantity: {quantity}</p>
        <p>Email: {email}</p>
        <p>Food Type: {foodType}</p>
        <p>Condition: {condition}</p>
        <button onClick={handleDelete} className="by-btn">BUY</button>
        <button className="cls-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FoodModal;
