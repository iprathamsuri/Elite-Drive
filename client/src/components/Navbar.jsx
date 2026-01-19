import "./Navbar.css";
import logo from "../assets/logo.png";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  // 🔁 Re-check user on every route change
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowProfile(false);
    navigate("/login");
  };

  // 🔥 List Cars click handler
  const handleListCars = () => {
    if (!user) {
      alert("Please login to list your car");
      navigate("/login");
      return;
    }
    navigate("/add-car");
  };

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/cars?search=${search}`);
    }
  };


  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <img src={logo} alt="Elite Drive" className="logo-img" />
      </div>

      {/* CENTER NAV */}
      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/bookings">My Bookings</Link></li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="search-boxx">
          <FaSearch
            className="search-icon"
            onClick={() => navigate(`/cars?search=${search}`)}
          />

          <input
            type="text"
            placeholder="Search cars"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/cars?search=${search}`);
              }
            }}
          />

        </div>

        {/* 🔥 List Cars Button */}
        <span className="list-cars" onClick={handleListCars} style={{ cursor: "pointer" }}>
          List Cars
        </span>

        {!user ? (
          <Link to="/login" className="login-btn">Login</Link>
        ) : (
          <div className="profile-wrapper">
            <FaUserCircle
              className="profile-icon"
              onClick={() => setShowProfile(!showProfile)}
            />

            {showProfile && (
              <div className="profile-dropdown">
                <p className="profile-name">{user.name}</p>
                <p className="profile-email">{user.email}</p>

                <button
                  className="profile-link-btn"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/bookings");
                  }}
                >
                  My Bookings
                </button>

                <button
                  className="profile-link-btn"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/owner-bookings");
                  }}
                >
                  My Car Bookings
                </button>

                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </nav>
  );
}
