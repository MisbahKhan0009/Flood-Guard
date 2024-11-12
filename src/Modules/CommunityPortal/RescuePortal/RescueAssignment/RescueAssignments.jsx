import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Pagination from "../../../../components/ui/Pagination";
import Table from "../../../../components/ui/table";
import RescueAssignmentDetails from "./RescueAssignmentList";
import logger from "../../../../utils/logger";

const RescueAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("rescuer_id");
  const [sortField, setSortField] = useState("rescuer_id");
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = [
    { label: "Rescuer", field: "rescuer_name", sortable: true },
    { label: "Victim", field: "victim_name", sortable: true },
    { label: "Rescue Time", field: "rescue_time", sortable: false },
    { label: "Status", field: "status", sortable: false },
    { label: "Action", field: "", sortable: false },
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
    const fetchAssignments = async () => {
      try {
        const offset = pageNumber * rowsPerPage;
        const response = await axios.get(
          "http://localhost:3000/api/rescue-assignments",
          {
            params: {
              search: searchTerm || "",
              searchField,
              sortField,
              sortOrder,
              limit: rowsPerPage,
              offset,
            },
          }
        );
        setAssignments(response.data.rescueAssignments);
        logger(response.data.rescueAssignments);
        setTotalAssignments(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching rescue assignments:", error);
      }
    };

    fetchAssignments();
  }, [searchTerm, searchField, sortField, sortOrder, pageNumber, rowsPerPage]);

  const renderAssignmentRow = (assignment) => (
    <RescueAssignmentDetails key={assignment.id} row={assignment} />
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-between mb-4">
        <p className="text-center my-4 text-lg">Search a Rescue Assignment</p>
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="Enter query"
          className="px-4 py-2 border w-1/2 mx-auto bg-secondary rounded-lg"
        />
      </div>

      <Table
        headers={headers}
        data={assignments}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
        renderRow={renderAssignmentRow}
      />
      <Pagination
        pageNumber={pageNumber}
        rowsPerPage={rowsPerPage}
        totalItems={totalAssignments}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default RescueAssignments;
