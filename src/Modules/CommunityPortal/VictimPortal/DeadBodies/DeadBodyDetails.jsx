import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";

const DeadBodyDetails = ({ row }) => {
  const [open, setOpen] = useState(false);

  const additionalInfo = [
    {
      label: "Image",
      value: (
        <img src={row.image_url} alt="Dead Body" className="w-32 h-auto" />
      ),
    },
    { label: "Submitted Hospital ID", value: row.submitted_hospital_id },
    { label: "Found Location", value: row.found_location },
    { label: "Date Found", value: new Date(row.found_time).toLocaleString() }, // Format date
    {
      label: "Submission Time",
      value: new Date(row.submission_time).toLocaleString(),
    }, // Format date
    { label: "Identified", value: row.identified },
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
        <td className="pb-1">
          <img src={row.image_url} alt="Dead Body" className="w-32 h-auto" />{" "}
          {/* Show image in main table */}
        </td>
        <td className="pb-1">{row.found_location}</td>
        <td className="text-center">
          {new Date(row.found_time).toLocaleString()}
        </td>
        <td className="text-center">{row.identified}</td>
      </tr>

      {open && (
        <AdditionalInfoTable additionalInfo={additionalInfo} row={row} />
      )}
    </>
  );
};

export default DeadBodyDetails;
