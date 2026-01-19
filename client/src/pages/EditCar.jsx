import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddCar.css";

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    type: "",
    year: "",
    seats: "",
    fuel: "",
    gear: "",
    location: "",
    price: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);

  // Load car data
  useEffect(() => {
    fetch(`http://localhost:5000/api/cars/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user) {
      alert("Please login to edit your car");
      navigate("/login");
      return;
    }

    if (!form.name || !form.price || !form.location) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userEmail: user.email
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Car updated successfully!");
      navigate("/cars");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addcar-container">
      <h2>Edit Car</h2>

      <div className="addcar-form">
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="type" value={form.type} onChange={handleChange} />
        <input name="year" value={form.year} onChange={handleChange} />
        <input name="seats" value={form.seats} onChange={handleChange} />
        <input name="fuel" value={form.fuel} onChange={handleChange} />
        <input name="gear" value={form.gear} onChange={handleChange} />
        <input name="location" value={form.location} onChange={handleChange} />
        <input name="price" value={form.price} onChange={handleChange} />
        <input name="image" value={form.image} onChange={handleChange} />

        <button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update Car"}
        </button>
      </div>
    </div>
  );
}
