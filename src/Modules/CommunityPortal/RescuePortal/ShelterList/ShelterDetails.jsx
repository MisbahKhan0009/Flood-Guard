import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";

// ShelterDetails Component to display each row with collapsible data
const ShelterDetails = ({ row }) => {
  const [open, setOpen] = useState(false);

  const additionalInfo = [
    { label: "Address Upazila", value: row.address_upazila },
    { label: "Address District", value: row.address_district },
    {
      label: "Exact Location",
      value: ["View Location", "Get Directions"], // For handling the map actions
    },
    { label: "Required Food", value: row.required_food },
    { label: "Required Medicine", value: row.required_medicine },
    { label: "Medical Support", value: row.medical_support },
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
        <td className="pb-1">{row.address_area}</td>
        <td className="text-center">{row.number_of_children}</td>
        <td className="text-center">{row.number_of_women}</td>
        <td className="text-center">{row.number_of_mothers}</td>
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
export default ShelterDetails;
