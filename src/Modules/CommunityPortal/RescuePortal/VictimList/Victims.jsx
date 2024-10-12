import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Badge from "../../../../components/ui/badge";
import { debounce } from "lodash";

import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";
import Pagination from "../../../../components/ui/Pagination";
import Table from "../../../../components/ui/table";

// Row Component to display each row with collapsible data
const Row = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false); // For View Location
  const [isDirectionOpen, setIsDirectionOpen] = useState(false); // For Get Directions

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const additionalInfo = [
    { label: "NID", value: row.NID },
    { label: "Address Upazila", value: row.address_upazila },
    { label: "Address District", value: row.address_district },
    {
      label: "Exact Location",
      value: ["View Location", "Get Directions"], // For handling the map actions
    },
    { label: "Mobile", value: row.mobile },
    { label: "Email", value: row.email },
    { label: "Gender", value: row.gender },
    { label: "Age", value: row.age },
    { label: "Number of Family Members", value: row.number_of_family_members },
    { label: "Health Status", value: row.health_status },
    { label: "Rescue Time", value: formatDate(row.rescue_time) || "N/A" },
    { label: "Resources Needed", value: row.resources_needed || "N/A" },
  ];

  return (
    <>
      <tr className="border-b  border-opacity-25 border-primary">
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
        <td className="text-center">
          <Badge
            variant={
              row.danger_level === "High"
                ? "destructive"
                : row.danger_level === "Medium"
                  ? "warning"
                  : "success"
            }
          >
            {row.danger_level}
          </Badge>
        </td>
        <td className="text-center">
          <Badge
            variant={
              row.rescue_status === "Pending"
                ? "destructive"
                : row.rescue_status === "In Progress"
                  ? "warning"
                  : "success"
            }
          >
            {row.rescue_status}
          </Badge>
        </td>
        <td className="text-center">
          <Badge
            variant={
              row.health_status === "Critical"
                ? "destructive"
                : row.health_status === "Injured"
                  ? "warning"
                  : "success"
            }
          >
            {row.health_status}
          </Badge>
        </td>
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

// Victims component to display table with search, sorting, and pagination
const Victims = ({ apiUrl }) => {
  const [victims, setVictims] = useState([]);
  const [totalVictims, setTotalVictims] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name"); // New state for search field
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = [
    { label: "Name", field: "name" },
    { label: "Area", field: "address_area" },
    { label: "Danger Level", field: "danger_level" },
    { label: "Rescue Status", field: "rescue_status" },
    { label: "Health Status", field: "health_status" },
  ];

  // Fetch victims from the API
  useEffect(() => {
    const fetchVictims = async () => {
      try {
        const offset = pageNumber * rowsPerPage;

        const response = await axios.get("http://localhost:3000/api/victims", {
          params: {
            search: searchTerm || "", // Ensure search term is included
            searchField, // Include selected search field
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

  // Handle search input (debounced for better performance)
  const handleSearchInput = debounce((event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0); // Reset to the first page when searching
  }, 300); // Debounce delay of 300ms

  // Handle sorting when a column header is clicked
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
  const renderVictimRow = (victim) => <Row key={victim.id} row={victim} />;

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
        // className="table-auto"
      />
    </div>
  );
};

export default Victims;
