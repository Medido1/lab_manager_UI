import { Link } from "react-router-dom";
import { InterfaceContext } from "../context/inferfaceContext";
import { useContext } from "react";

function ClientTableHeader({type, searchTerm, setSearchTerm}) {
  const {darkMode} = useContext(InterfaceContext);

  return(
    <div className={`flex flex-col sm:flex-row gap-4 justify-center sm:justify-between 
      items-center w-full px-4 py-6 ${darkMode ? 'bg-teal-950' : 'bg-blue-200'}`}>
      <Link to="/">
        <button
          className={` rounded-full px-4 py-2 cursor-pointer
           hover:scale-110 transition duration-150
          ${darkMode ? 'bg-gray-600 hover:bg-gray-800 text-white' : 'bg-white hover:bg-blue-400'}`}
        >
          Home
        </button>
      </Link>
      <h1
        className={`order-first sm:order-none text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}
      >
        {type}
      </h1>
      <div>
        <label
          className={`text-black`}
          htmlFor="search"
        ></label>
        <input
          type="text"
          className={`p-2 w-full sm:w-[60%] rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-black text-white': 'bg-white'}`}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ClientTableHeader;