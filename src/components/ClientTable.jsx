import ClientTableHeader from "./ClientTableHeader";
import ClientTableMain from "./ClientTableMain";
import ClientTableFooter from "./ClientTableFooter";
import { useState, useEffect } from "react";

function ClientTable({type, data}) {
  const [searchTerm, setSearchTerm] = useState("");
  /* add pagination feature */
  const itemsPerPage = 14;
  const [displayData, setDisplayData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  function displayLastPage() {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayData(data.slice(indexOfFirstItem, indexOfLastItem))
  }

  // start the display on the last page
  useEffect(() => {
    setCurrentPage(totalPages > 0 ? totalPages : 1);
  }, [type]); 

  useEffect(() => {
    if (searchTerm.trim() === "") {
      displayLastPage()
    }
  }, [currentPage, data, searchTerm]);

  // search clients

  useEffect(() => {
    if (searchTerm.trim() === "" ) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
      displayLastPage();
      return ;
    }
    const searchData = data.filter((client) => 
      client.fullName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setDisplayData(searchData)
  }, [searchTerm]);

  return (
    <div className="flex flex-col flex-grow">
      <ClientTableHeader 
        type={type}
        searchTerm = {searchTerm}
        setSearchTerm = {setSearchTerm}
      />
      <ClientTableMain 
        data={displayData}
        type={type}
      />
      <ClientTableFooter 
        currentPage={currentPage} 
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        />
    </div>
  )
}

export default ClientTable;