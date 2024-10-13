import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Pagination from "../../../../components/ui/Pagination";
import Table from "../../../../components/ui/table";
import DonationDetails from "./DonationDetails";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = [
    { label: "Donor Name", field: "donor_name", sortable: true },
    { label: "Donation Type", field: "donation_type", sortable: true },
    { label: "Quantity", field: "quantity", sortable: true },
    { label: "Date Received", field: "date_received", sortable: true },
    
  ];

  const handleChangePage = (newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageNumber(0);
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const offset = pageNumber * rowsPerPage;

        const response = await axios.get(
          "http://localhost:3000/api/donations",
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
        setDonations(response.data.donations);
        setTotalDonations(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
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
    <DonationDetails key={victim.id} row={victim} />
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-between mb-4">
        <p className="text-center my-4 text-lg">Search by Name and Item</p>
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="Enter query"
          className="px-4 py-2 border w-1/2 mx-auto bg-secondary rounded-lg"
        />
      </div>

      <Table
        headers={headers}
        data={donations}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
        renderRow={renderVictimRow}
      />
      <Pagination
        pageNumber={pageNumber}
        rowsPerPage={rowsPerPage}
        totalItems={totalDonations}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Donations;
