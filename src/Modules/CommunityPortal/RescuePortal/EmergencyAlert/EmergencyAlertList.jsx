import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";
import { formatDate } from "../../../../utils/dateFormatter";

const EmergencyAlert = ({ alert }) => {
  const [open, setOpen] = useState(false);

  const additionalInfo = [
    { label: "Alert ID", value: alert.alert_id },
    { label: "Victim ID", value: alert.victim_name },
    { label: "Alert Time", value: formatDate(alert.alert_time) },
    {
      label: "Location",
      value: `${alert.location_latitude}, ${alert.location_longitude}`,
    },
    { label: "Message", value: alert.message || "N/A" },
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
        <td className="pb-1 text-center">{alert.alert_id}</td>
        <td className="pb-1 text-left">{alert.victim_name}</td>
        <td className="text-left">{formatDate(alert.alert_time)}</td>
        <td className="text-left">{alert.message}</td>
      </tr>

      {open && (
        <AdditionalInfoTable additionalInfo={additionalInfo} row={alert} />
      )}
    </>
  );
};

export default EmergencyAlert;
