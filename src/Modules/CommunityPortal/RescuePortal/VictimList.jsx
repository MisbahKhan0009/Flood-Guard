// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SquareCardPagination from "../../../components/ui/SquareCardPagination";

// const VictimList = () => {
//   const [victims, setVictims] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortField, setSortField] = useState("id");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [pageNumber, setPageNumber] = useState(0);
//   const [totalVictims, setTotalVictims] = useState(0);
//   const limit = 10; // Items per page

//   const totalPages = Math.ceil(totalVictims / limit);

//   useEffect(() => {
//     const fetchVictims = async () => {
//       try {
//         const offset = pageNumber * limit;
//         const response = await axios.get(`http://localhost:3000/api/victims`, {
//           params: {
//             search: searchTerm,
//             sortField,
//             sortOrder,
//             limit,
//             offset,
//           },
//         });
//         setVictims(response.data.victims);
//         setTotalVictims(response.data.totalCount);
//       } catch (error) {
//         console.error("Error fetching victims:", error);
//       }
//     };

//     fetchVictims();
//   }, [searchTerm, sortField, sortOrder, pageNumber]);

//   return (
//     <div className="container  mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Victim List</h1>

//       {/* Search Input */}
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search by name"
//         className="mb-4 p-2 border rounded"
//       />

//       {/* Victim Table */}
//       <Table>
//         <TableCaption>A list of flood victims</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead onClick={() => setSortField("id")}>
//               ID {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
//             </TableHead>
//             <TableHead onClick={() => setSortField("name")}>
//               Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
//             </TableHead>
//             <TableHead onClick={() => setSortField("age")}>
//               Age {sortField === "age" && (sortOrder === "asc" ? "↑" : "↓")}
//             </TableHead>
//             <TableHead onClick={() => setSortField("gender")}>
//               Gender{" "}
//               {sortField === "gender" && (sortOrder === "asc" ? "↑" : "↓")}
//             </TableHead>
//             <TableHead onClick={() => setSortField("location")}>
//               Location{" "}
//               {sortField === "location" && (sortOrder === "asc" ? "↑" : "↓")}
//             </TableHead>
//             <TableHead onClick={() => setSortField("contact")}>
//               Contact{" "}
//               {sortField === "contact" && (sortOrder === "asc" ? "↑" : "↓")}
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {victims.map((victim) => (
//             <TableRow key={victim.id}>
//               <TableCell className="font-medium">{victim.id}</TableCell>
//               <TableCell>{victim.name}</TableCell>
//               <TableCell>{victim.age}</TableCell>
//               <TableCell>{victim.gender}</TableCell>
//               <TableCell>{victim.location}</TableCell>
//               <TableCell>{victim.contact}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Pagination */}
//       <SquareCardPagination
//         page={pageNumber}
//         totalPages={totalPages}
//         pageNumber={pageNumber}
//         setPageNumber={setPageNumber}
//       />
//     </div>
//   );
// };

// export default VictimList;

import React from "react";

const VictimList = () => {
  return <div className="text-primary">demo</div>;
};

export default VictimList;
