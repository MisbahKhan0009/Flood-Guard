import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Pagination from "../../../../components/ui/Pagination";
import DeadBodyDetails from "./DeadBodyDetails"; // Import the details component
import Table from "../../../../components/ui/table";

const DeadBodies = () => {
  const [deadBodies, setDeadBodies] = useState([]);
  const [totalDeadBodies, setTotalDeadBodies] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name"); // This might need to be adjusted depending on your API
  const [sortField, setSortField] = useState("found_time"); // Adjust to relevant field
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = [
    { label: "Image", field: "image_url", sortable: false },
    { label: "Found Location", field: "found_location", sortable: true },
    { label: "Date Found", field: "found_time", sortable: true },
    { label: "Identified", field: "identified", sortable: true },
  ];

  const handleChangePage = (newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageNumber(0); // Reset to first page on row per page change
  };

  useEffect(() => {
    const fetchDeadBodies = async () => {
      try {
        const offset = pageNumber * rowsPerPage;

        const response = await axios.get(
          "http://localhost:3000/api/dead-bodies",
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

        setDeadBodies(response.data.deadBodies);
        setTotalDeadBodies(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching dead bodies:", error);
      }
    };

    fetchDeadBodies();
  }, [searchTerm, searchField, sortField, sortOrder, pageNumber, rowsPerPage]);

  const handleSearchInput = debounce((event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0); // Reset to first page on search
  }, 300);

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const renderDeadBodyRow = (deadBody) => (
    <DeadBodyDetails key={deadBody.body_id} row={deadBody} />
  );

  return (
    <div className="w-full p-4">
      {/* <div className="flex flex-col justify-between mb-4">
        <p className="text-center my-4 text-lg">Search Dead Bodies</p>
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="Enter query"
          className="px-4 py-2 border w-1/2 mx-auto bg-secondary rounded-lg"
        />
      </div> */}

      <Table
        headers={headers}
        data={deadBodies}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
        renderRow={renderDeadBodyRow}
      />
      <Pagination
        pageNumber={pageNumber}
        rowsPerPage={rowsPerPage}
        totalItems={totalDeadBodies}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DeadBodies;
