import React from "react";
import { useNavigate } from "react-router-dom";
import "./CarCard.css";
import API from "../services/api";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  const isOwner = user && car.ownerEmail === user.email;

  // 🗑 Delete Car (only owner)
  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      await API.delete(`/api/cars/${car._id}`, {
        data: {
          userEmail: user.email, // 🔐 send owner email
        },
      });

      alert("Car deleted successfully!");
      window.location.reload();

    } catch (err) {
      alert(
        "Error: " +
        (err.response?.data?.message || err.message)
      );
    }
  };


  // ✏ Edit Car (only owner)
  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-car/${car._id}`);
  };

  return (
    <div
      className="car-card"
      onClick={() => navigate(`/cars/${car._id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="car-image-container">
        <img src={car.image} alt={car.name} className="car-Image" />
        <span className="car-available">Available Now</span>
        <span className="car-price">₹{car.price} / day</span>
      </div>

      <div className="car-info">
        <div className="car-title-row">
          <h3 className="car-name">{car.name}</h3>

          {isOwner && (
            <div className="admin-actions-inline">
              <button className="edit-btn" onClick={handleEdit}>✏ Edit</button>
              <button className="delete-btn" onClick={handleDelete}>🗑 Delete</button>
            </div>
          )}
        </div>

        <p className="car-type-year">
          {car.type} · {car.year}
        </p>

        <div className="car-details">
          <div className="detail-item">
            <span className="icon">👤</span>
            {car.seats} Seats
          </div>
          <div className="detail-item">
            <span className="icon">⛽</span>
            {car.fuel}
          </div>
        </div>

        <div className="car-details">
          <div className="detail-item">
            <span className="icon">🚗</span>
            {car.gear}
          </div>
          <div className="detail-item">
            <span className="icon">📍</span>
            {car.location}
          </div>
        </div>

        {/* 🔐 Owner-only Buttons */}
        {/* {isOwner && (
          <div className="admin-actions">
            <button className="edit-btn" onClick={handleEdit}>✏ Edit</button>
            <button className="delete-btn" onClick={handleDelete}>🗑 Delete</button>

          </div>
        )} */}
      </div>
    </div>
  );
};

export default CarCard;
