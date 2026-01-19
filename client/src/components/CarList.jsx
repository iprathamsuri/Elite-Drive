import { useEffect, useState } from "react";
import CarCard from "./CarCard";
import "./CarList.css";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [sort, setSort] = useState("price-low");

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);

  const sortedCars = [...cars].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "newest") return b.year - a.year;
    return 0;
  });

  return (
    <section className="featured-sectionn">

      {/* HEADER */}
      <div className="cars-header">
        <div>
          <h2>Featured Vehicles</h2>
          <p>Explore our selection of premium vehicles</p>
        </div>

        <select
          className="sort-dropdown"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* GRID */}
      <div className="car-list-grid">
        {sortedCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

    </section>
  );
}
