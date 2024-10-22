import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa"; // Import an edit icon from react-icons

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editableData, setEditableData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      setEditableData(parsedData); // Initialize editableData with userData
    }
  }, []);

  // Prepare profile picture URL
  const profilePictureUrl = `https://avatar.iran.liara.run/username?username=${userData.name || "User"}`;

  // Function to handle input change
  const handleChange = (key, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Function to handle edit toggle
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  // Function to handle update API call
  const handleUpdate = async () => {
    const apiUrl =
      userData.role === "victim"
        ? "http://localhost:3000/api/victims/"
        : "http://localhost:3000/api/rescuers/";

    try {
      const response = await fetch(apiUrl, {
        method: "PUT", // Use PUT or PATCH as necessary
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableData),
      });
      if (response.ok) {
        // Handle successful update (e.g., show a success message)
        console.log("Profile updated successfully");
        setUserData(editableData); // Update the displayed userData
        handleEditToggle(); // Close the edit mode
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full mx-auto my-12 p-6 rounded-xl shadow-lg bg-secondary">
      <h2 className="text-3xl font-light text-center my-6">Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-primary mb-4"
        />
        <span className="text-lg font-semibold text-gray-800">
          {userData.name || "N/A"}
        </span>
      </div>

      {/* User data displayed in a table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left text-primary">Field</th>
            <th className="p-2 text-right text-primary">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userData).map(([key, value]) => (
            <tr key={key} className="border-b">
              <td className="p-2 text-primary capitalize">
                {key.replace(/_/g, " ")}:
              </td>
              <td className="p-2 text-right text-primary">
                {userData.role !== "victim" && key === "id" ? (
                  <span>{value}</span>
                ) : isEditing ? (
                  <input
                    type="text"
                    value={editableData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="border rounded p-1 text-primary"
                  />
                ) : (
                  <>
                    {value || "N/A"}
                    {key !== "id" && key !== "role" && (
                      <FaEdit
                        className="inline ml-2 cursor-pointer text-primary hover:text-blue-500"
                        onClick={handleEditToggle}
                      />
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="mt-6">
          <button
            onClick={handleUpdate}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
