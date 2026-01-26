import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import API from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Account created successfully!");
      navigate("/login");

    } catch (error) {
      alert(
        "Signup failed: " +
        (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
