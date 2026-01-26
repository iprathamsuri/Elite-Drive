import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CarCard from "../components/CarCard";
import "./AvailableCars.css";
import API from "../services/api";

export default function AvailableCars() {
  const [cars, setCars] = useState([]);
  const [sort, setSort] = useState("price-low");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    API.get("/api/cars")
      .then(res => setCars(res.data))
      .catch(() => alert("Failed to load cars"));
  }, []);

  // 🔃 Sort cars
  const sortedCars = [...cars].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "newest") return b.year - a.year;
    return 0;
  });

  // 🔍 Filter by search query
  const filteredCars = sortedCars.filter(car =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cars-page">

      <div className="cars-header">
        <h2>Available Cars</h2>

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

      <div className="cars-grid">
        {filteredCars.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>
            No cars found for "{searchQuery}"
          </p>
        ) : (
          filteredCars.map(car => (
            <CarCard key={car._id} car={car} />
          ))
        )}
      </div>

    </div>
  );
}
