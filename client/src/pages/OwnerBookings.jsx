import { useEffect, useState } from "react";
import "./OwnerBookings.css";
import API from "../services/api";

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchOwnerBookings = async () => {
      try {
        const res = await API.get(`/api/bookings/owner/${user.email}`);
        setBookings(res.data);
      } catch (err) {
        alert("Failed to load owner bookings");
      }
    };

    fetchOwnerBookings();
  }, [user]);


  if (!user) {
    return <h2 style={{ padding: "120px", textAlign: "center" }}>
      Please login to view owner bookings
    </h2>;
  }

  return (
    <div className="owner-bookings-page">
      <h2 className="owner-title">Bookings on My Cars</h2>

      {bookings.length === 0 ? (
        <p className="no-owner-bookings">No bookings yet</p>
      ) : (
        <div className="owner-bookings-grid">
          {bookings.map(b => (
            <div className="owner-booking-card" key={b._id}>
              <h3>{b.carName}</h3>
              <p>👤 Customer: {b.userEmail}</p>
              <p>📍 Location: {b.location}</p>
              <p>📅 {b.pickupDate} → {b.returnDate}</p>
              <p>💰 ₹{b.pricePerDay} / day</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
