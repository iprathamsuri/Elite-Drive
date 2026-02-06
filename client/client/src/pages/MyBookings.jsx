import { useEffect, useState } from "react";
import "./MyBooking.css";
import API from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await API.get(`/api/bookings/${user.email}`);
        setBookings(res.data);
      } catch (err) {
        alert("Failed to load bookings");
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await API.delete(`/api/bookings/${id}`);

      setBookings(prev =>
        prev.filter(b => b._id !== id)
      );

      alert("Booking cancelled successfully!");
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to cancel booking"
      );
    }
  };

  if (!user) {
    return (
      <h2 style={{ padding: "120px", textAlign: "center" }}>
        Please login to view bookings
      </h2>
    );
  }

  return (
    <div className="bookings-page">
      <h2 className="bookings-title">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings yet</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((b) => (
            <div className="booking-card" key={b._id}>
              <div className="booking-header">
                <h3>{b.carName}</h3>
                <span className="booking-status">Active</span>
              </div>

              <div className="booking-info">
                <p>📍 {b.location}</p>
                <p>💰 ₹{b.pricePerDay} / day</p>
                <p>📅 {b.pickupDate} → {b.returnDate}</p>
              </div>

              <button
                className="cancel-btn"
                onClick={() => handleCancel(b._id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
