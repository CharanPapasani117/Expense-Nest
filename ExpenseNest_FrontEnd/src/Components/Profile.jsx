import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [editData, setEditData] = useState({}); // For edit form data
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("email");

        if (!email) {
          setError("No email found in local storage");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/users/profile?email=${encodeURIComponent(
            email
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
        setEditData({
          firstName: data["First Name"],
          lastName: data.LastName,
          phoneNumber: data.PhoneNumber,
          email: data.email,
        });
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      }
    };

    fetchProfile();
  }, []);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: editData.firstName,
          lastName: editData.lastName,
          phoneNumber: editData.phoneNumber,
          email: editData.email, // Email should remain unchanged
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      // Update the profile state directly to reflect changes immediately
      setProfile({
        ...profile,
        "First Name": editData.firstName,
        LastName: editData.lastName,
        PhoneNumber: editData.phoneNumber,
      });

      setSuccess("Profile updated successfully");
      setShowModal(false);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>User Profile</h2>

        {error && (
          <div style={{ color: "red", marginBottom: "20px" }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div style={{ color: "green", marginBottom: "20px" }}>
            <strong>Success:</strong> {success}
          </div>
        )}

        {profile && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>Profile Details</h3>
            <p>
              <strong>First Name:</strong> {profile["First Name"]}
            </p>
            <p>
              <strong>Last Name:</strong> {profile.LastName}
            </p>
            <p>
              <strong>Phone Number:</strong> {profile.PhoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "400px",
              }}
            >
              <h3>Edit Profile</h3>
              <form>
                <div style={{ marginBottom: "10px" }}>
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleEditChange}
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleEditChange}
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editData.phoneNumber}
                    onChange={handleEditChange}
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Email (read-only):</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginTop: "5px",
                      backgroundColor: "#f4f4f4",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
