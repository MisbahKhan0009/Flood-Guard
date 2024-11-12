import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Pagination from "../../../../components/ui/Pagination";
import Table from "../../../../components/ui/table";
import HospitalDetails from "./HospitalDetails";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = [
    { label: "Hospital Name", field: "name", sortable: true },
    { label: "Location", field: "location", sortable: true },
    { label: "Beds", field: "bed", sortable: true },
    { label: "Available Beds", field: "bed_available", sortable: true },
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
    const fetchHospitals = async () => {
      try {
        const offset = pageNumber * rowsPerPage;
        const response = await axios.get(
          "http://localhost:3000/api/hospitals",
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
        setHospitals(response.data.hospitals);
        setTotalHospitals(response.data.totalCount); // Ensure totalCount is returned by API
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, [searchTerm, searchField, sortField, sortOrder, pageNumber, rowsPerPage]);

  const renderHospitalRow = (hospital) => (
    <HospitalDetails key={hospital.hospital_id} row={hospital} />
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-between mb-4">
        <p className="text-center my-4 text-lg">Search by Name and Location</p>
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="Enter query"
          className="px-4 py-2 border w-1/2 mx-auto bg-secondary rounded-lg"
        />
      </div>

      <Table
        headers={headers}
        data={hospitals}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
        renderRow={renderHospitalRow}
      />
      <Pagination
        pageNumber={pageNumber}
        rowsPerPage={rowsPerPage}
        totalItems={totalHospitals}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Hospitals;
