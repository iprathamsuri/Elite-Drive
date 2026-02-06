import "./TestimonialCard.css";

export default function TestimonialCard({ name, email, location, rating, text }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{name}</h3>
          <p className="email">{email}</p>
          <p className="location">{location}</p>
        </div>
      </div>

      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${i < rating ? "filled" : ""}`}
          >
            ★
          </span>
        ))}
      </div>

      <p className="review-text">"{text}"</p>
    </div>
  );
}
