import { useState } from "react";
import "./ReviewForm.css";
import API from "../services/api";

export default function ReviewForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    rating: 5,
    text: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.text) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await API.post("/api/reviews", form);

      onAdd(res.data);
      alert("Review submitted successfully!");

      setForm({
        name: "",
        email: "",
        location: "",
        rating: 5,
        text: ""
      });
    } catch (err) {
      alert("Failed to submit review");
    }
  };

  return (
    <div className="review-form">
      <h3>Leave a Review</h3>

      <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Your Email" value={form.email} onChange={handleChange} />
      <input name="location" placeholder="City, Country" value={form.location} onChange={handleChange} />

      <select name="rating" value={form.rating} onChange={handleChange}>
        <option value={5}>★★★★★</option>
        <option value={4}>★★★★</option>
        <option value={3}>★★★</option>
        <option value={2}>★★</option>
        <option value={1}>★</option>
      </select>

      <textarea
        name="text"
        placeholder="Write your experience..."
        value={form.text}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
}
