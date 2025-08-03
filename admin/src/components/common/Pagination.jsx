import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange
}) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Function to display pages with ellipsis similar to Angular version
    const displayPages = () => {
        const pages = [];
        const current = currentPage;
        const total = totalPages;

        if (total <= 7) {
            // Show all pages if total is 7 or less
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (current <= 4) {
                // Near the start
                pages.push(2, 3, 4);
                pages.push('...');
            } else if (current >= total - 3) {
                // Near the end
                pages.push('...');
                pages.push(total - 3, total - 2, total - 1);
            } else {
                // Middle - show current page and neighbors
                pages.push('...');
                pages.push(current - 1, current, current + 1);
                pages.push('...');
            }

            // Always show last page
            pages.push(total);
        }

        return pages;
    };

    // Helper to determine button width based on page number length
    const getButtonWidthClass = (page) => {
        if (page === '...') return '';
        const pageStr = String(page);
        if (pageStr.length <= 2) return 'w-6 lg:w-7';
        if (pageStr.length === 3) return 'w-8 lg:w-9';
        return 'w-10 lg:w-11';
    };

    return (
        <div className="flex justify-center items-center text-[#F1F0E9] gap-2 py-4 border-t border-gray-200 dark:border-gray-700">
            {/* Previous button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 lg:w-8 lg:h-9 cursor-pointer flex items-center justify-center  bg-[#23262D] dark:bg-[#23262D] rounded-[2px] disabled:opacity-50"
            >
                <IoIosArrowBack />
            </button>

            {/* Page numbers */}
            <div className="bg-[#23262D] dark:bg-[#23262D] rounded-[2px] flex gap-1 p-1">
                {displayPages().map((page, index) => (
                    page !== '...' ? (
                        <button
                            key={index}
                            className={`h-6 lg:h-7 flex cursor-pointer items-center justify-center rounded-[2px] ${getButtonWidthClass(page)} ${page === currentPage
                                ? 'bg-[#F1F0E9] dark:bg-[#F1F0E9] text-black'
                                : 'bg-[#16423C]  dark:bg-[#16423C]'
                                }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="px-1">...</span>
                    )
                ))}
            </div>

            {/* Next button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 lg:w-8 lg:h-9 cursor-pointer flex items-center justify-center text-[#F1F0E9] bg-[#23262D] dark:bg-[#23262D] rounded-[2px] disabled:opacity-50"
            >
                <IoIosArrowForward />
            </button>
        </div>
    )
}

export default Pagination
