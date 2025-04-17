import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const params = useParams();
  const storedUserId = localStorage.getItem("userId");
  const userId = params.userId || storedUserId;

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    profile_picture: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  useEffect(() => {
    if (!userId) return console.error("No user ID.");
    axios
      .get(`http://localhost:5000/profile/${userId}`)
      .then(({ data }) => {
        setUser(data);
        setEditData(data);
      })
      .catch(console.error);
  }, [userId]);

  const handleChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setEditData({ ...editData, profile_picture: e.target.files[0] });

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("full_name", editData.full_name);
    formData.append("email", editData.email);
    formData.append("phone", editData.phone);
    formData.append("address", editData.address);
    // IMPORTANT: name must match multer.single("profile_picture")
    formData.append("profile_picture", editData.profile_picture);

    axios
      .put(
        `http://localhost:5000/profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(({ data }) => {
        setUser(data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Save failed:", err);
        alert("Could not save profile—see console.");
      });
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  // helper to prefix uploads path if needed
  const imgSrc =
    user.profile_picture && !user.profile_picture.startsWith("http")
      ? `http://localhost:5000${user.profile_picture}`
      : user.profile_picture;

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      {isEditing ? (
        <>
          <label>
            Full Name:
            <input
              type="text"
              name="full_name"
              value={editData.full_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={editData.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={editData.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="file"
              name="profile_picture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <div className="buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Full Name:</strong> {user.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p>
            <strong>Profile Picture:</strong><br/>
            {imgSrc ? (
              <img src={imgSrc} alt="Profile" width="120" />
            ) : (
              "No picture set"
            )}
          </p>
          <button onClick={handleEdit}>Edit Profile</button>
        </>
      )}
    </div>
  );
}

