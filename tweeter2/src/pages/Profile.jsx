import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [value, setValue] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("username") || "Guest";
    setValue(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      localStorage.setItem("username", value.trim());
      alert("Username saved!");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>User Name</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
