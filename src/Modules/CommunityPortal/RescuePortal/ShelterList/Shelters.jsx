import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Pagination from "../../../../components/ui/Pagination";
import Table from "../../../../components/ui/table";
import ShelterDeetails from "./ShelterDetails";

const Shelters = () => {
  const [shelters, setShelters] = useState([]);
  const [totalShelters, setTotalShelters] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = [
    { label: "Name", field: "name", sortable: true },
    { label: "Area", field: "address_area", sortable: true },
    {
      label: "Number of Children",
      field: "number_of_children",
      sortable: true,
    },
    { label: "Number of Women", field: "number_of_women", sortable: true },
    { label: "Number of Mothers", field: "number_of_mothers", sortable: true },
  ];

  const handleChangePage = (newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageNumber(0);
  };

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const offset = pageNumber * rowsPerPage;

        const response = await axios.get("http://localhost:3000/api/shelters", {
          params: {
            search: searchTerm || "",
            searchField,
            sortField,
            sortOrder,
            limit: rowsPerPage,
            offset,
          },
        });
        setShelters(response.data.shelters);
        setTotalShelters(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching shelters:", error);
      }
    };

    fetchShelters();
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
  const renderVictimRow = (victim) => (
    <ShelterDeetails key={victim.id} row={victim} />
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-between mb-4">
        <p className="text-center my-4 text-lg">Search by Name and Area</p>
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="Enter query"
          className="px-4 py-2 border w-1/2 mx-auto bg-secondary rounded-lg"
        />
      </div>

      <Table
        headers={headers}
        data={shelters}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
        renderRow={renderVictimRow}
      />
      <Pagination
        pageNumber={pageNumber}
        rowsPerPage={rowsPerPage}
        totalItems={totalShelters}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Shelters;
