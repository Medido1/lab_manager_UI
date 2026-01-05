function ClientTableFooter({currentPage, totalPages, setCurrentPage}) {
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
        >
          Export 
        </button>
      </div>
    </footer>
  )
}

export default ClientTableFooter;