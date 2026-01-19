import { useState } from "react";
import "./ReviewForm.css";

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
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      onAdd(data);   // show instantly

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
      console.error(err);
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
