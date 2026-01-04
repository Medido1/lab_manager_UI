import { Link } from "react-router-dom";
import folderIcon from '/folder.png';
import { useContext } from "react";

function DataLinks() {
  const buttonStyle = `mt-4 px-8 py-2 rounded-full cursor-pointer border-black border-2
  font-bold hover:scale-125 transition duration-100 bg-blue-200 hover:bg-blue-100 flex items-center gap-2`


  return (
    <div className={`sm:mt-0 flex flex-col sm:flex-row justify-center items-center gap-4`}>
      <Link to='/anapath'>
        <button
          className={buttonStyle}
        >
          <img src={folderIcon} alt="icon" className="h-4" />
          Anapath
        </button>
      </Link>
      <Link to="/cytoponction">
        <button
          className={buttonStyle}
        >
          <img src={folderIcon} alt="icon" className="h-4" />
          Cytoponction
        </button>
      </Link>
      <Link to="/fcv">
        <button
          className={buttonStyle}
        >
          <img src={folderIcon} alt="icon" className="h-4" />
          F.C.V
        </button>
      </Link>
    </div>
  )
}

export default DataLinks;