import { Link } from "react-router-dom";

function ClientTableHeader({type}) {
  return(
    <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-between 
    items-center w-full px-4 py-6 bg-blue-200">
      <Link to="/">
        <button
          className={` rounded-full px-4 py-2 cursor-pointer
          hover:bg-blue-400 hover:scale-110 transition duration-150
          bg-white`}
        >
          Home
        </button>
      </Link>
      <h1
        className={`order-first sm:order-none text-2xl font-bold text-black`}
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
          focus:ring-2 focus:ring-blue-400 bg-white`}
          placeholder="Search"
        />
      </div>
    </div>
  )
}

export default ClientTableHeader;