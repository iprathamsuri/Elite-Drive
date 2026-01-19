import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCar.css";

export default function AddCar() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "",
    year: "",
    seats: "",
    fuel: "",
    gear: "",
    location: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // 🔐 Check login
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Please login to add a car");
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user) return;

    const {
      name, type, year, seats, fuel,
      gear, location, price, image
    } = form;

    if (!name || !type || !year || !seats || !fuel || !gear || !location || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ownerEmail: user.email   // 🔐 attach owner
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add car");
      }

      alert("Car added successfully!");

      setForm({
        name: "",
        type: "",
        year: "",
        seats: "",
        fuel: "",
        gear: "",
        location: "",
        price: "",
        image: "",
      });

      navigate("/cars");

    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addcar-container">
      <h2>Add New Car</h2>

      <div className="addcar-form">
        <input name="name" placeholder="Car Name" value={form.name} onChange={handleChange} />
        <input name="type" placeholder="Type (SUV / Sedan)" value={form.type} onChange={handleChange} />
        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <input name="seats" placeholder="Seats" value={form.seats} onChange={handleChange} />
        <input name="fuel" placeholder="Fuel (Petrol/Diesel)" value={form.fuel} onChange={handleChange} />
        <input name="gear" placeholder="Gear (Automatic/Manual)" value={form.gear} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="price" placeholder="Price per day" value={form.price} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding Car..." : "Add Car"}
        </button>
      </div>
    </div>
  );
}
