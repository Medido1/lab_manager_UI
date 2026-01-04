import ClientTableHeader from "./ClientTableHeader";
import ClientTableMain from "./ClientTableMain";
import ClientTableFooter from "./ClientTableFooter";
import { useState, useEffect } from "react";

function ClientTable({type, data}) {
  /* add pagination feature */
  const itemsPerPage = 14;
  const [displayData, setDisplayData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // start the display on the last page
  useEffect(() => {
    setCurrentPage(totalPages > 0 ? totalPages : 1);
  }, [data]); 

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayData(data.slice(indexOfFirstItem, indexOfLastItem))
  }, [currentPage, data]);

  return (
    <div className="flex flex-col flex-grow">
      <ClientTableHeader 
        type={type}
      />
      <ClientTableMain data={displayData} />
      <ClientTableFooter 
        currentPage={currentPage} 
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        />
    </div>
  )
}

export default ClientTable;