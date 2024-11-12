import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";
import { formatDate } from "../../../../utils/dateFormatter";

const HospitalDetails = ({ row }) => {
  const [open, setOpen] = useState(false);

  const additionalInfo = [
    { label: "Hospital Name", value: row.name },
    { label: "Location", value: row.location },
    { label: "Beds", value: row.bed },
    { label: "Available Beds", value: row.bed_available },
    { label: "Contact", value: row.contact || "N/A" },
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
        <td className="pb-1">{row.name}</td>
        <td className="pb-1">{row.location}</td>
        <td className="text-center">{row.bed}</td>
        <td className="text-center">{row.bed_available}</td>
      </tr>

      {open && (
        <AdditionalInfoTable additionalInfo={additionalInfo} row={row} />
      )}
    </>
  );
};

export default HospitalDetails;
