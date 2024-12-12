import React from 'react';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (currentPage:number)=>void; 
  }

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
    
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          onClick={() => onPageChange(i)}
          className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm border first:rounded-s-lg last:rounded-e-lg focus:outline-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 ${
            i === currentPage
              ? 'text-gray-900 bg-gray-500 border-gray-200 dark:bg-neutral-600'
              : 'text-gray-200 hover:bg-gray-500 dark:hover:bg-white/10'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <nav className="flex items-center -space-x-px py-5" aria-label="Pagination">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-200 hover:text-gray-800 hover:bg-gray-500 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        aria-label="Previous"
      >
        <svg
          className="shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      {renderPageNumbers()}

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-200 hover:text-gray-900 hover:bg-gray-500 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        aria-label="Next"
      >
        <span className="sr-only">Next</span>
        <svg
          className="shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;