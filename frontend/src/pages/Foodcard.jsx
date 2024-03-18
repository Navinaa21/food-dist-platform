// FoodCard.js

import React, { useState } from "react";
import "./Foodcard.css"; // create a CSS file for styling
import FoodModal from "./FoodModal";
const FoodCard = ({ image, foodName, donorName, contact, location, quantity, email, foodType, condition,onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="food-card" >
      <img src={image} alt={foodName} />
      <div className="card-details">
        <h3>{foodName}</h3>
        <p>Donor: {donorName}</p>
        <p>Contact: {contact}</p>
        <p>Location: {location}</p>
        <button className="car-btn" onClick={openModal}>View More</button>
        {isModalOpen && (
          <FoodModal
            onDelete={onDelete} 
            onClose={closeModal}
            {...{ image, foodName, donorName, contact, location, quantity, email, foodType, condition }}
          />
        )}
      </div>
    </div>
  );
};

export default FoodCard;
