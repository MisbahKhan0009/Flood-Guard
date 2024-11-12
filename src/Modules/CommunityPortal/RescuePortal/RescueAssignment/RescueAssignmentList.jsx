import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";
import { formatDate } from "../../../../utils/dateFormatter";
import axios from "axios";
import { toast } from "sonner";

const RescueAssignmentDetails = ({ row, onStatusUpdate }) => {
  const [open, setOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState(row.status);
  const [rescueTime, setRescueTime] = useState(row.rescue_time);

  // Retrieve the rescuer_id from session storage
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const rescuerId = userData ? userData.rescuer_id : null;

  // Function to handle Rescue button click
  const handleRescueStart = async (assignmentId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/rescue-assignments/${assignmentId}`,
        {
          rescuer_id: rescuerId,
          status: "In Progress",
        }
      );

      if (response.status === 200) {
        toast.success("Rescue started successfully!");
        setLocalStatus("In Progress");
      }
    } catch (error) {
      console.error("Error starting rescue:", error);
      toast.error("Failed to start rescue.");
    }
  };

  const handleMarkCompleted = async (assignmentId) => {
    const now = new Date();

    // Format the current time as YYYY-MM-DD HH:MM:SS
    const formattedTime =
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
      `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/rescue-assignments/${assignmentId}`,
        {
          rescuer_id: rescuerId,
          status: "Completed",
          rescue_time: formattedTime, // Use the formatted time
        }
      );

      if (response.status === 200) {
        toast.success("Rescue marked as completed!");
        setLocalStatus("Completed");
        setRescueTime(formattedTime);
      }
    } catch (error) {
      console.error(
        "Error marking rescue as completed:",
        error.response || error
      );
      toast.error(
        `Failed to mark rescue as completed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const additionalInfo = [
    { label: "Rescuer ID", value: row.rescuer_name },
    { label: "Victim ID", value: row.victim_name },
    { label: "Rescue Time", value: formatDate(rescueTime) },
    { label: "Status", value: localStatus },
  ];

  return (
    <>
      <tr className="border-b border-opacity-25 border-primary">
        <td className="pb-1">
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-xs text-white rounded"
          >
            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </td>
        <td className="pb-1">{row.rescuer_name}</td>
        <td className="pb-1">{row.victim_name}</td>
        <td className="text-center">{formatDate(rescueTime)}</td>
        <td className="text-center">{localStatus}</td>
        <td className="text-center">
          {localStatus === "Pending" && (
            <button
              onClick={() => handleRescueStart(row.assignment_id)}
              className="p-2 m-1 text-xs rounded bg-red-500 bg-opacity-10 border border-1 border-red-500 text-red-500"
            >
              Start Rescue
            </button>
          )}
          {localStatus === "In Progress" && (
            <button
              onClick={() => handleMarkCompleted(row.assignment_id)}
              className="p-2 m-1 text-xs rounded bg-yellow-500 bg-opacity-10 border border-1 border-yellow-500 text-yellow-500"
            >
              Mark Completed
            </button>
          )}
          {localStatus === "Completed" && (
            <button
              disabled
              className="p-2 m-1 text-xs cursor-not-allowed rounded bg-green-500 bg-opacity-10 border border-1 border-green-500 text-green-500"
            >
              Completed
            </button>
          )}
        </td>
      </tr>

      {open && (
        <AdditionalInfoTable
          additionalInfo={additionalInfo}
          row={row}
        ></AdditionalInfoTable>
      )}
    </>
  );
};

export default RescueAssignmentDetails;
