import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Pagination from "../../../../components/ui/Pagination";
import Table from "../../../../components/ui/table";
import EmergencyAlert from "./EmergencyAlertList";

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("alert_id");
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = [
    { label: "Alert ID", field: "alert_id", sortable: true },
    { label: "Victim", field: "victim_id", sortable: true },
    { label: "Alert Time", field: "alert_time", sortable: true },
    { label: "Message", field: "message", sortable: false },
  ];

  const handleChangePage = (newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageNumber(0);
  };

  const handleSearchInput = debounce((event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
  }, 300);

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    const fetchEmergencyAlerts = async () => {
      try {
        const offset = pageNumber * rowsPerPage;
        const response = await axios.get(
          "http://localhost:3000/api/emergency-alerts",
          {
            params: {
              search: searchTerm || "",
              sortField,
              sortOrder,
              limit: rowsPerPage,
              offset,
            },
          }
        );
        setAlerts(response.data);
        
        setTotalAlerts(response.data.length); // Assuming response data has all the alerts
      } catch (error) {
        console.error("Error fetching emergency alerts:", error);
      }
    };

    fetchEmergencyAlerts();
  }, [searchTerm, sortField, sortOrder, pageNumber, rowsPerPage]);

  const renderAlertRow = (alert) => (
    <EmergencyAlert key={alert.alert_id} alert={alert} />
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-between mb-4">
        <p className="text-center my-4 text-lg">Search Emergency Alerts</p>
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="Enter query"
          className="px-4 py-2 border w-1/2 mx-auto bg-secondary rounded-lg"
        />
      </div>

      <Table
        headers={headers}
        data={alerts}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
        renderRow={renderAlertRow}
      />
      <Pagination
        pageNumber={pageNumber}
        rowsPerPage={rowsPerPage}
        totalItems={totalAlerts}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default EmergencyAlerts;
