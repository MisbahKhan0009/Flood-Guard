import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { debounce } from "lodash";
import MapComponent from "../../../../components/ui/MapComponent";
import DirectionsMap from "../../../../components/ui/DirectionsMap";
import Modal from "../../../../components/ui/modal";
import AdditionalInfoTable from "../../../../components/ui/AdditionalInfoTable";
import Pagination from "../../../../components/ui/Pagination";
import Table from "../../../../components/ui/table";

// Row Component to display each row with collapsible data
const Row = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false); // For View Location
  const [isDirectionOpen, setIsDirectionOpen] = useState(false); // For Get Directions

  const additionalInfo = [
    { label: "Address Upazila", value: row.address_upazila },
    { label: "Address District", value: row.address_district },
    {
      label: "Exact Location",
      value: ["View Location", "Get Directions"], // For handling the map actions
    },

    { label: "Required Food", value: row.required_food },
    { label: "Required Medicine", value: row.required_medicine },
    { label: "Medical Support", value: row.medical_support },
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
        <td className="pb-1">{row.name}</td>
        <td className="pb-1">{row.address_area}</td>
        <td className="text-center">{row.number_of_children}</td>
        <td className="text-center">{row.number_of_women}</td>
        <td className="text-center">{row.number_of_mothers}</td>
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

// Shelters component to display table with search, sorting, and pagination
const Shelters = ({ apiUrl }) => {
  const [shelters, setShelters] = useState([]);
  const [totalShelters, setTotalShelters] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = [
    // { label: " ", field: " ", sortable: false },
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
    setPageNumber(0); // Reset page number when changing rows per page
  };

  // Fetch Shelters from the API
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const offset = pageNumber * rowsPerPage;

        const response = await axios.get("http://localhost:3000/api/shelters", {
          params: {
            search: searchTerm || "", // Ensure search term is included
            searchField, // Include selected search field
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
  }, [
    apiUrl,
    searchTerm,
    searchField,
    sortField,
    sortOrder,
    pageNumber,
    rowsPerPage,
  ]);

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
  const renderVictimRow = (victim) => <Row key={victim.id} row={victim} />;

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

      {/* Table */}
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
