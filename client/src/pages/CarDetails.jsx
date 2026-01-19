import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CarDetails.css";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/cars/${id}`)
      .then(res => res.json())
      .then(data => setCar(data));
  }, [id]);

  if (!car) return <h2>Loading...</h2>;

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to book a car");
      navigate("/login");
      return;
    }

    if (!pickupDate || !returnDate) {
      alert("Please select dates");
      return;
    }

    await fetch("http://localhost:5000/api/bookings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userEmail: user.email,
    ownerEmail: car.ownerEmail,   // 🔥 send owner email
    carId: car._id,
    carName: car.name,
    pricePerDay: car.price,
    pickupDate,
    returnDate,
    location: car.location,
  }),
});


    navigate("/bookings");
  };

  return (
    <div className="car-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-layout">
        <div className="details-left">
          <img src={car.image} alt={car.name} />
          <h2>{car.name}</h2>
          <p>{car.type} · {car.year}</p>

          <div className="specs">
            <span>{car.seats} Seats</span>
            <span>{car.fuel}</span>
            <span>{car.gear}</span>
            <span>{car.location}</span>
          </div>

          <h3>Description</h3>
          <p>Luxury {car.name} for premium travel experience.</p>
        </div>

        <div className="details-right">
          <h2>₹{car.price} <span>/ day</span></h2>

          <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
          <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />

          <button className="book-btn" onClick={handleBooking}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
