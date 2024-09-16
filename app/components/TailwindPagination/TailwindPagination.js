import { useState } from 'react';
// import { useRouter } from 'next/router';

export default function TailwindPagination({ totalPages, currentPage,setCurrentPage }) {
        // const router = useRouter();

    const handlePageChange = (page) => {
        setCurrentPage(page);

        // Optionally push the page number to the URL (useful for SSR and client-side navigation)
        // router.push(`?page=${page}`);
    };

    return (
        <div className="flex items-center justify-center mt-4 space-x-2">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-1 py-1 bg-gray-300 text-sm text-gray-700 rounded-md ${
                    currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'
                }`}
            >
                Prev
            </button>

            {/* Pagination Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-2  rounded-md text-sm ${
                        currentPage === index + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                >
                    {index + 1}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-1 py-1 text-sm bg-gray-300 text-gray-700 rounded-md ${
                    currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'
                }`}
            >
                Next
            </button>
        </div>
    );
}
