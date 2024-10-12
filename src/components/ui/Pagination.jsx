import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  pageNumber,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <span>
        Showing {pageNumber * rowsPerPage + 1} to{" "}
        {Math.min((pageNumber + 1) * rowsPerPage, totalItems)} of {totalItems}{" "}
        items
      </span>
      <div className="flex items-center justify-center">
        <p>Items per page</p>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(e)}
          className="mx-2 p-1 border bg-secondary rounded-lg"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber === 0}
          className="p-2 bg-secondary rounded-lg text-primary"
        >
          <IoIosArrowBack />
        </button>
        <span className="px-2">
          Page {pageNumber + 1} of {Math.ceil(totalItems / rowsPerPage)}
        </span>
        <button
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber >= Math.ceil(totalItems / rowsPerPage) - 1}
          className="p-2 bg-secondary rounded-lg text-primary"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
