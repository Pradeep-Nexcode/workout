import React from 'react';
import * as XLSX from 'xlsx';
import Btn from './Btn';

const ExcelDownload = ({ data, selectedRows, filename = 'download' }) => {
  const handleDownload = () => {
    if (!selectedRows || selectedRows.length === 0) return;

    // Filter data based on selected rows
    const selectedData = data.filter((_, index) => selectedRows.includes(index));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(selectedData);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <Btn
      onClick={handleDownload}
      className={`${(!selectedRows || selectedRows.length === 0) ? 'opacity-50 cursor-not-allowed' : ''} bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2`}
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Download Excel
    </Btn>
  );
};

export default ExcelDownload;