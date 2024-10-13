import React from "react";

const Table = ({
  headers,
  data,
  sortField,
  sortOrder,
  handleSort,
  renderRow,
}) => {
  return (
    <table className="min-w-full text-primary table-auto border-collapse text-left">
      <thead>
        <tr>
          <th className="p-2 w-4"></th>
          {headers.map((header) => (
            <th
              key={header.field}
              className={`p-2 cursor-pointer ${
                header.label === "Name" || header.label === "Area"
                  ? "text-left"
                  : "text-center"
              } w-[150px]`}
              onClick={() => handleSort(header.field)}
            >
              {header.label}{" "}
              {sortField === header.field && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
