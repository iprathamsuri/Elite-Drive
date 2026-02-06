import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import ReviewForm from "./ReviewForm";
import "./Testimonial.css";
import API from "../services/api";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get("/api/reviews")
      .then(res => setReviews(res.data))
      .catch(() => alert("Failed to load reviews"));
  }, []);

  const addNewReview = (review) => {
    setReviews([review, ...reviews]);
  };
  return (
    <section className="testimonial-section">
      <h2>What Our Customers Say</h2>
      <p className="subtitle">
        Real reviews from real customers.
      </p>

      <ReviewForm onAdd={addNewReview} />

      <div className="testimonials">
        {reviews.map((t) => (
          <TestimonialCard key={t._id} {...t} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
