import React, { useState, useEffect } from "react";
import axios from "axios";

import { debounce } from "lodash";
import Pagination from "../../../../components/ui/Pagination";
import Table from "../../../../components/ui/table";
import VictimDetails from "./VictimDetails";

const Victims = () => {
  const [victims, setVictims] = useState([]);
  const [totalVictims, setTotalVictims] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = [
    { label: "Name", field: "name" },
    { label: "Area", field: "address_area" },
    { label: "Danger Level", field: "danger_level" },
    { label: "Rescue Status", field: "rescue_status" },
    { label: "Health Status", field: "health_status" },
  ];

  useEffect(() => {
    const fetchVictims = async () => {
      try {
        const offset = pageNumber * rowsPerPage;

        const response = await axios.get("http://localhost:3000/api/victims", {
          params: {
            search: searchTerm || "",
            searchField,
            sortField,
            sortOrder,
            limit: rowsPerPage,
            offset,
          },
        });
        setVictims(response.data.victims);
        setTotalVictims(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching victims:", error);
      }
    };

    fetchVictims();
  }, [searchTerm, searchField, sortField, sortOrder, pageNumber, rowsPerPage]);

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

  const handleChangePage = (newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageNumber(0);
  };
  const renderVictimRow = (victim) => (
    <VictimDetails key={victim.id} row={victim} />
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-between mb-4">
        <p className="text-center my-4 text-lg">
          Search by Name, Danger Level, Rescue Status or Health Status
        </p>
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="Enter query"
          className="px-4 py-2 border w-1/2 mx-auto bg-secondary rounded-lg"
        />
      </div>

      {/* Table */}
      <Table
        headers={headers}
        data={victims}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
        renderRow={renderVictimRow}
      />

      <Pagination
        pageNumber={pageNumber}
        rowsPerPage={rowsPerPage}
        totalItems={totalVictims}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Victims;
