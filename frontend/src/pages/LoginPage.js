import React, { useState } from "react";
import api from "../api";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/auth/login", { email, password });
      onLogin(response.data.token);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="page-center">
      <form className="card login-card" onSubmit={handleSubmit}>
        <h2>Mini CRM Login</h2>
        <p className="hint">Use your admin credentials to continue.</p>

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>

        {message && <div className={isError ? "message error" : "message success"}>{message}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
