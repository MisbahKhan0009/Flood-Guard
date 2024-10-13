import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";
import Badge from "../../../../components/ui/badge";
import { useState } from "react";

const VictimDetails = ({ row }) => {
  const [open, setOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const additionalInfo = [
    { label: "NID", value: row.NID },
    { label: "Address Upazila", value: row.address_upazila },
    { label: "Address District", value: row.address_district },
    {
      label: "Exact Location",
      value: ["View Location", "Get Directions"],
    },
    { label: "Mobile", value: row.mobile },
    { label: "Email", value: row.email },
    { label: "Gender", value: row.gender },
    { label: "Age", value: row.age },
    { label: "Number of Family Members", value: row.number_of_family_members },
    { label: "Health Status", value: row.health_status },
    { label: "Rescue Time", value: formatDate(row.rescue_time) || "N/A" },
    { label: "Resources Needed", value: row.resources_needed || "N/A" },
  ];

  return (
    <>
      <tr className="border-b  border-opacity-25 border-primary">
        <td className="pb-1">
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-xs text-white rounded"
          >
            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </td>
        <td className="pb-1">{row.name}</td>
        <td className="pb-1">{row.address_area}</td>
        <td className="text-center">
          <Badge
            variant={
              row.danger_level === "High"
                ? "destructive"
                : row.danger_level === "Medium"
                  ? "warning"
                  : "success"
            }
          >
            {row.danger_level}
          </Badge>
        </td>
        <td className="text-center">
          <Badge
            variant={
              row.rescue_status === "Pending"
                ? "destructive"
                : row.rescue_status === "In Progress"
                  ? "warning"
                  : "success"
            }
          >
            {row.rescue_status}
          </Badge>
        </td>
        <td className="text-center">
          <Badge
            variant={
              row.health_status === "Critical"
                ? "destructive"
                : row.health_status === "Injured"
                  ? "warning"
                  : "success"
            }
          >
            {row.health_status}
          </Badge>
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

export default VictimDetails;
