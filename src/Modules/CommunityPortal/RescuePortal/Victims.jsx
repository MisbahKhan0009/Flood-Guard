import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowUp } from "lucide-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Component to display each row with collapsible data
const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  // Additional information fields
  const additionalInfo = [
    { label: "NID", value: row.NID },
    { label: "Address Upazila", value: row.address_upazila },
    { label: "Address District", value: row.address_district },
    { label: "Latitude", value: row.latitude },
    { label: "Longitude", value: row.longitude },
    { label: "Mobile", value: row.mobile },
    { label: "Email", value: row.email },
    { label: "Gender", value: row.gender },
    { label: "Age", value: row.age },
    { label: "Number of Family Members", value: row.number_of_family_members },
    { label: "Health Status", value: row.health_status },
    { label: "Rescue Time", value: row.rescue_time || "N/A" },
    { label: "Resources Needed", value: row.resources_needed || "N/A" },
  ];

  return (
    <>
      <tr >
        <td>
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-xs  text-white rounded"
          >
            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </td>
        <td>{row.name}</td>
        <td>{row.address_area}</td>
        <td>{row.danger_level}</td>
        <td>{row.rescue_status}</td>
      </tr>
      {open && (
        <tr className="p-1 ">
          <td colSpan={5}>
            <div className="p-2 m-2 pb-8 w-4/5 mx-auto rounded-xl bg-secondary">
              <h4 className="font-thin  text-center text-2xl my-6">Additional Information</h4>
              <table className="w-3/4  mx-auto  table-auto border-collapse">
                <tbody >
                  {additionalInfo.map((info) => (
                    <tr className="border-b" key={info.label}>
                      <td className="p-1 ps-5 ">{info.label}</td>
                      <td className="text-end">{info.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const Victims = () => {
  const [victims, setVictims] = useState([]);
  const [totalVictims, setTotalVictims] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchVictims = async () => {
      try {
        const offset = pageNumber * rowsPerPage;
        const response = await axios.get("http://localhost:3000/api/victims", {
          params: {
            search: searchTerm,
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
  }, [searchTerm, sortField, sortOrder, pageNumber, rowsPerPage]);

  const handleChangePage = (newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageNumber(0);
  };

  return (
    <div className="w-full  p-4">
      <table className="min-w-full text-primary table-auto border-collapse text-left">
        <thead>
          <tr className=" ">
            <th className="p-2"></th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => setSortField("name")}
            >
              Name
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => setSortField("address_area")}
            >
              Area
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => setSortField("danger_level")}
            >
              Danger Level
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => setSortField("rescue_status")}
            >
              Rescue Status
            </th>
          </tr>
        </thead>
        <tbody >
          {victims.map((victim) => (
            <Row className="mb-4" key={victim.victim_id} row={victim} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handleChangePage(pageNumber - 1)}
          disabled={pageNumber === 0}
          className="p-2 bg-gray-300 text-gray-700 rounded"
        >
          Previous
        </button>
        <span className="px-2">
          Page {pageNumber + 1} of {Math.ceil(totalVictims / rowsPerPage)}
        </span>
        <button
          onClick={() => handleChangePage(pageNumber + 1)}
          disabled={pageNumber >= Math.ceil(totalVictims / rowsPerPage) - 1}
          className="p-2  text-gray-700 rounded"
        >
          Next
        </button>
        <select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          className="ml-2 p-2 border border-gray-300 rounded"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default Victims;
