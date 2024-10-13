import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";
import { formatDate } from "../../../../utils/dateFormatter";
// ShelterDetails Component to display each row with collapsible data
const DonationDetails = ({ row }) => {
  const [open, setOpen] = useState(false);

  const additionalInfo = [
    { label: "Name", value: row.donor_name },
    { label: "Donation Type", value: row.donation_type },
    { label: "Quantity", value: row.quantity },
    { label: "Date Received", value: formatDate(row.date_received) },
    { label: "Notes", value: row.notes },
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
        <td className="pb-1">{row.donor_name}</td>
        <td className="pb-1">{row.donation_type}</td>
        <td className="text-center">{row.quantity}</td>
        <td className="text-center">{formatDate(row.date_received)}</td>
        
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
export default DonationDetails;
