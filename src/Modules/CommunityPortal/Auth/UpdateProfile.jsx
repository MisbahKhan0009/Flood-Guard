import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editableData, setEditableData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    const parsedData = storedData ? JSON.parse(storedData) : {};

    // Ensure all required fields are present, set to "N/A" if missing
    const requiredFields = [
      "NID",
      "name",
      "age",
      "mobile",
      "organization",
      "gender",
      "skills",
      "notes",
    ];
    const completeData = requiredFields.reduce((data, field) => {
      data[field] = parsedData[field] || "N/A";
      return data;
    }, {});

    setUserData(completeData);
    setEditableData(completeData); // Initialize editableData with completeData
  }, []);

  // Prepare profile picture URL
  const profilePictureUrl = `https://ui-avatars.com/api/?name=${userData.name || "User"}`;

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
    const userId = JSON.parse(sessionStorage.getItem("userData")).userId; // Retrieve userId from userData
    console.log("Request Body:", JSON.stringify(editableData));

    // Construct API URL based on role
    const apiUrl =
      JSON.parse(sessionStorage.getItem("userData")).role === "victim"
        ? `http://localhost:3000/api/victims/${userId}`
        : `http://localhost:3000/api/rescuers/${userId}`;
    console.log("API URL:", apiUrl);

    // Only send fields that have changed (filter out "N/A" values)
    const updateData = Object.keys(editableData).reduce((acc, key) => {
      if (editableData[key] !== "N/A") {
        acc[key] = editableData[key];
      }
      return acc;
    }, {});

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        setUserData(editableData); // Update the displayed userData
        handleEditToggle(); // Close the edit mode
      } else {
        const errorText = await response.text();
        console.error("Failed to update profile:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-10/12 mx-auto my-12 p-6 rounded-xl shadow-lg bg-secondary">
      <h2 className="text-3xl font-light text-center my-6">Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-primary mb-4"
        />
        <span className="text-3xl font-semibold text-primary capitalize">
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
                {key.replace(/_/g, " ")}
              </td>
              <td className="p-2 text-right text-primary">
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="border rounded p-1 text-gray-800"
                  />
                ) : (
                  value || "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="hover:bg-secondary hover:text-white px-4 py-2 rounded bg-primary text-secondary border border-primary mr-4"
          >
            Update Profile
          </button>
        ) : (
          <button
            onClick={handleEditToggle}
            className="hover:bg-secondary hover:text-white px-4 py-2 rounded bg-primary text-secondary border border-primary"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
