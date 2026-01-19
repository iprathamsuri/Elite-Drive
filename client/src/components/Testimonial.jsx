import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import ReviewForm from "./ReviewForm";
import "./Testimonial.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
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
