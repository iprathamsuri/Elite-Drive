import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      // backend should return user object
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/");

    } catch (error) {
      alert(
        "Login failed: " +
        (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

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

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
