import { useEffect, useState } from "react";
import CarCard from "./CarCard";
import "./CarList.css";
import API from "../services/api";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [sort, setSort] = useState("price-low");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await API.get("/api/cars");
        setCars(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load cars");
      }
    };

    fetchCars();
  }, []);

  const sortedCars = [...cars].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "newest") return b.year - a.year;
    return 0;
  });

  return (
    <section className="featured-sectionn">
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

      <div className="car-list-grid">
        {sortedCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
}
