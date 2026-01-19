import "./HowItWorks.css";

import step1 from "../../assets/images/step1.png";
import step2 from "../../assets/images/step2.png";
import step3 from "../../assets/images/step3.png";
import step4 from "../../assets/images/step4.png";

const steps = [
  { id: 1, title: "Visit Website", img: step1 },
  { id: 2, title: "Search for desired Car and book", img: step2 },
  { id: 3, title: "Verify your profile", img: step3 },
  { id: 4, title: "Get ready for your trip", img: step4 },
];

export default function HowItWorks() {
  return (
    <section className="howitworks">
      <h2 className="how-title">How to book a car on Elite Drive</h2>

      <div className="steps-grid">
        {steps.map((step) => (
          <div className="step-card" key={step.id}>
            <img src={step.img} alt={step.title} />
            <p>{step.title}</p>
          </div>
        ))}
      </div>

      <div className="features">
        <div className="feature">
          <span>🛡️</span>
          <h4>100%</h4>
          <p>Hassle free Secured Trip</p>
        </div>
        <div className="feature">
          <span>👍</span>
          <h4>25000+</h4>
          <p>Quality cars in the city</p>
        </div>
        <div className="feature">
          <span>🚚</span>
          <h4>Delivery</h4>
          <p>Anywhere, Anytime</p>
        </div>
        <div className="feature">
          <span>⏱️</span>
          <h4>Endless</h4>
          <p>Pay by hour, drive limitless</p>
        </div>
      </div>
    </section>
  );
}
