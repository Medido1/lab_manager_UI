import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {getFullData} from '../api/clientApi'
import { useEffect, useState } from "react";

function ClientTableFooter({currentPage, totalPages, setCurrentPage}) {
  const [fullData, setFullData] = useState([]);
  const [message, setMessage] = useState("");

  const exportToExcel = (data, filename = "data.xlsx") => {
    // 1. Convert data (array of objects) to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 2. Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 3. Generate buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // 4. Convert buffer to Blob and trigger download
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, filename);
  };

  return (
    <footer className="bg-gray-200 flex justify-center p-2 relative">
      <button 
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400 disabled:opacity-50
        cursor-pointer"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        Previous
      </button>
      <span className="px-2 py-2">
        {currentPage} / {totalPages}
      </span>
      <button 
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400 disabled:opacity-50
        cursor-pointer"
        onClick={() =>setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        Next
      </button>
      <div className="absolute right-20 sm:right-10 bottom-2 flex items-center gap-4">
        <button
          className=" bg-blue-300 rounded px-4 py-2 hover:bg-blue-400
          disabled:opacity-50 cursor-pointer"
          onClick={async () => {
            const data = await getFullData(setMessage); 
            if (data) setFullData(data);  
            exportToExcel(data);               
          }}
        >
          Export 
        </button>
      </div>
    </footer>
  )
}

export default ClientTableFooter;