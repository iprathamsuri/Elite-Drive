import "./Hero.css";
import carImage from "../assets/car2.png";

export default function Hero() {
  return (
    <section className="hero">
      <h1>Luxury cars on Rent</h1>

      <div className="search-box">
        <div className="field">
          <label>Pickup Location</label>
          <select>
            <option>Please select location</option>
          </select>
        </div>

        <div className="field">
          <label>Pick-up Date</label>
          <input type="date" />
        </div>

        <div className="field">
          <label>Return Date</label>
          <input type="date" />
        </div>

        <button className="search-btn">Search</button>
      </div>

      <img src={carImage} alt="Car" className="car-image" />
    </section>
  );
}
