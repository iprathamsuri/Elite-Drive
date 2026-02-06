import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CarList from "./components/CarList";
import Testimonials from "./components/Testimonial";
import OwnerBanner from "./components/OwnerBanner";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks/HowItWork";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AvailableCars from "./pages/AvailableCars";
import MyBookings from "./pages/MyBookings";
import CarDetails from "./pages/CarDetails";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";

import OwnerBookings from "./pages/OwnerBookings";

import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Main content wrapper (pushes footer down) */}
      <div className="main-content">
        <Routes>
          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CarList />
                <HowItWorks />
                <OwnerBanner />
                <Testimonials />
              </>
            }
          />

          {/* CARS LIST */}
          <Route path="/cars" element={<AvailableCars />} />

          {/* CAR DETAILS */}
          <Route path="/cars/:id" element={<CarDetails />} />

          {/* OTHER PAGES */}
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/edit-car/:id" element={<EditCar />} />

          <Route path="/owner-bookings" element={<OwnerBookings />} />

        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
