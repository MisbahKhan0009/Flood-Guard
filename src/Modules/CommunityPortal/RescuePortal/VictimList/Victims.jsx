import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import Badge from "../../../../components/ui/badge";
import { debounce } from "lodash";
import MapComponent from "../../../../components/ui/MapComponent";
import DirectionsMap from "../../../../components/ui/DirectionsMap";
import Modal from "../../../../components/ui/modal";

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
        <tr>
          <td colSpan={6}>
            <div className="p-2 m-2 w-4/5 mx-auto rounded-xl bg-secondary">
              <h4 className="font-thin text-center text-2xl my-6">
                Additional Information
              </h4>
              <table className="w-3/4 mx-auto table-auto border-collapse">
                <tbody>
                  {additionalInfo.map((info) => (
                    <tr className="border-b" key={info.label}>
                      <td className="p-1">{info.label}</td>
                      <td className="text-end">
                        {info.label === "Exact Location" ? (
                          <>
                            <button
                              className="text-blue-500 mr-4"
                              onClick={() => setIsMapOpen(true)}
                            >
                              {info.value[0]} {/* View Location */}
                            </button>
                            <button
                              className="text-blue-500"
                              onClick={() => setIsDirectionOpen(true)}
                            >
                              {info.value[1]} {/* Get Directions */}
                            </button>
                          </>
                        ) : (
                          info.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Modal for View Location */}
              <Modal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)}>
                <h3 className="text-center mb-4">View Location</h3>
                <MapComponent
                  latitude={row.latitude}
                  longitude={row.longitude}
                />
              </Modal>

              {/* Modal for Get Directions */}
              <Modal
                isOpen={isDirectionOpen}
                onClose={() => setIsDirectionOpen(false)}
              >
                <h3 className="text-center mb-4">Get Directions</h3>
                <DirectionsMap destination={[row.latitude, row.longitude]} />
              </Modal>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// VictimTable component to display table with search, sorting, and pagination
const VictimTable = ({ apiUrl }) => {
  const [victims, setVictims] = useState([]);
  const [totalVictims, setTotalVictims] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name"); // New state for search field
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleChangePage = (newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageNumber(0);
  };

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
      <table className="min-w-full text-primary table-auto border-collapse text-left">
        <thead>
          <tr>
            <th className="p-2"></th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("address_area")}
            >
              Area{" "}
              {sortField === "address_area" &&
                (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="p-2 text-center cursor-pointer"
              onClick={() => handleSort("danger_level")}
            >
              Danger Level{" "}
              {sortField === "danger_level" &&
                (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="p-2 text-center cursor-pointer"
              onClick={() => handleSort("rescue_status")}
            >
              Rescue Status{" "}
              {sortField === "rescue_status" &&
                (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="p-2 text-center cursor-pointer"
              onClick={() => handleSort("health_status")}
            >
              Health Status{" "}
              {sortField === "health_status" &&
                (sortOrder === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {victims.map((victim) => (
            <Row key={victim.id} row={victim} />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {pageNumber * rowsPerPage + 1} to{" "}
          {Math.min((pageNumber + 1) * rowsPerPage, totalVictims)} of{" "}
          {totalVictims} victims
        </span>
        <div className="flex items-center justify-center">
          <p>Items per page</p>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="mx-2 p-1 border bg-secondary rounded-lg"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <button
            onClick={() => handleChangePage(pageNumber - 1)}
            disabled={pageNumber === 0}
            className="p-2 bg-secondary rounded-lg text-primary"
          >
            <IoIosArrowBack />
          </button>
          <span className="px-2">
            Page {pageNumber + 1} of {Math.ceil(totalVictims / rowsPerPage)}
          </span>
          <button
            onClick={() => handleChangePage(pageNumber + 1)}
            disabled={pageNumber >= Math.ceil(totalVictims / rowsPerPage) - 1}
            className="p-2 bg-secondary rounded-lg text-primary"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictimTable;
