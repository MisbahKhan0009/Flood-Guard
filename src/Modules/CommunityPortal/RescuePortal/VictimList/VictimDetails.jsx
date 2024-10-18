import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";
import Badge from "../../../../components/ui/badge";
import { useState } from "react";
import { formatDate } from "../../../../utils/dateFormatter";

const VictimDetails = ({ row }) => {
  const [open, setOpen] = useState(false);

  const additionalInfo = [
    { label: "NID", value: row.NID || "N/A"},
    { label: "Address Upazila", value: row.address_upazila || "N/A"},
    { label: "Address District", value: row.address_district || "N/A"},
    {
      label: "Exact Location",
      value: ["View Location", "Get Directions"],
    },
    { label: "Mobile", value: row.mobile || "N/A"},
    { label: "Email", value: row.email || "N/A"},
    { label: "Gender", value: row.gender || "N/A" },
    { label: "Age", value: row.age || "N/A" },
    { label: "Number of Family Members", value: row.number_of_family_members || "N/A" },
    { label: "Health Status", value: row.health_status || "N/A" },
    { label: "Rescue Time", value: formatDate(row.rescue_time) || "N/A" },
    { label: "Resources Needed", value: row.resources_needed || "N/A" },
  ];

  return (
    <>
      {" "}
      <tr className="border-b border-opacity-25 border-primary">
        {" "}
        <td className="pb-1">
          {" "}
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-xs text-white rounded"
          >
            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}{" "}
          </button>{" "}
        </td>
        <td className="pb-1">{row.name}</td>{" "}
        <td className="pb-1">{row.address_area}</td>{" "}
        <td className="text-center">
          {" "}
          <Badge
            variant={
              row.danger_level === "High"
                ? "destructive"
                : row.danger_level === "Medium"
                  ? "warning"
                  : row.danger_level === "Low"
                    ? "success"
                    : "default"
            }
          >
            {row.danger_level || "N/A"}{" "}
          </Badge>{" "}
        </td>{" "}
        <td className="text-center">
          {" "}
          <Badge
            variant={
              row.rescue_status === "Pending"
                ? "destructive"
                : row.rescue_status === "In Progress"
                  ? "warning"
                  : row.rescue_status === "Completed"
                    ? "success"
                    : "default"
            }
          >
            {row.rescue_status || "N/A"}{" "}
          </Badge>{" "}
        </td>{" "}
        <td className="text-center">
          {" "}
          <Badge
            variant={
              row.health_status === "Critical"
                ? "destructive"
                : row.health_status === "Injured"
                  ? "warning"
                  : row.health_status
                    ? "success"
                    : "default"
            }
          >
            {row.health_status || "N/A"}{" "}
          </Badge>{" "}
        </td>{" "}
      </tr>{" "}
      {open && (
        <AdditionalInfoTable
          additionalInfo={additionalInfo}
          row={row}
        ></AdditionalInfoTable>
      )}{" "}
    </>
  );
};

export default VictimDetails;
