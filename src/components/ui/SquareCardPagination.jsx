const SquareCardPagination = ({
    page,
    totalPages,
    pageNumber,
    setPageNumber,
  }) => {
    const updatePageNumber = (num) => {
      if (num >= totalPages || num < 0) return;
      setPageNumber(num);
    };
  
    return (
      <div className="flex justify-center items-center gap-3 bg-white p-2 shadow-lg rounded-md w-fit mx-auto select-none">
        {/* Left arrow */}
        <div
          onClick={() => updatePageNumber(pageNumber - 1)}
          className="hover:scale-110 scale-100 transition-all duration-200 cursor-pointer bg-sky-100 px-1 py-1 rounded-md"
        >
          <svg
            className="w-8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                d="M15 7L10 12L15 17"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
  
        <div className="flex justify-center items-center gap-2">
          {[...Array(totalPages).keys()].map((item) => (
            <div
              key={item}
              onClick={() => setPageNumber(item)}
              className={`cursor-pointer hover:scale-110 text-sm scale-100 transition-all duration-200 px-3 ${
                pageNumber === item ? "bg-sky-500 text-white" : "bg-white"
              } border-sky-300  font-semibold text-gray-700 py-[6px] rounded-md`}
            >
              {item + 1}
            </div>
          ))}
        </div>
  
        {/* Right arrow */}
        <div
          onClick={() => updatePageNumber(pageNumber + 1)}
          className="hover:scale-110 scale-100 transition-all duration-200 cursor-pointer bg-sky-100 px-1 py-1 rounded-md"
        >
          <svg
            className="w-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                d="M10 7L15 12L10 17"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>
    );
  };

  export default SquareCardPagination;