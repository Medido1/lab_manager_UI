import {useContext } from "react";
import { DataContext } from "../context/DataContext";
import { InterfaceContext} from '../context/inferfaceContext';

function TodaysResults() {
  const { anapathData, cytoponctionData,fcvData} = useContext(DataContext);
  const {darkMode} = useContext(InterfaceContext)

  function isSameDay(a, b) {
    const dateA = new Date(a);
    const dateB = new Date(b);

    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  }

  const today = new Date(); // current day

  const getTodayItems = (data, type) =>
  data.filter(item => item.type === type && !item.sortie && isSameDay(item.endDate, today));

  const anapathToday = getTodayItems(anapathData, "Anapath");
  const cytoponctionToday = getTodayItems(cytoponctionData, "Cytoponction");
  const FCVToday = getTodayItems(fcvData, "F.C.V");

  const todayDisplay = today.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const headerClassName = `${darkMode ? 'border-white' : 'border-black'} text-lg sm:text-xl font-bold border-b-2`

  return (
    <div className={`px-4 py-2 sm:flex-grow rounded-lg ${darkMode ? 'results_dark text-white': 'results'}`}>
      <h1 className="text-2xl text-center font-bold">
        Résultats {todayDisplay}
      </h1>
      <h2 className={`${headerClassName} w-[22%]`}>
        Anapath :
      </h2>
      <ul className="ml-2">
        {anapathToday.map(item => 
          <li key={item.id}>
            <p className={`${darkMode ? 'text-white' : 'text-black'} font-bold text-lg`}>
              {item.number}-{item.fullName}
            </p>
          </li>
        )}
      </ul>
      <h2 className= {`${headerClassName} mt-4 w-[32%]`}>
        Cytoponction :
      </h2>
      <ul className="ml-2">
        {cytoponctionToday.map(item => 
          <li key={item.id}>
            <p className={`${darkMode ? 'text-white' : 'text-black'} font-bold text-lg`}>
              {item.number}-{item.fullName}
            </p>
          </li>
        )}
      </ul>
      <h2 className={`${headerClassName} mt-4 w-[12%]`}>
        FCV :
      </h2>
      <ul className="ml-2">
        {FCVToday.map(item => 
          <li key={item.id}>
            <p className={`${darkMode ? 'text-white' : 'text-black'} font-bold text-lg`}>
              {item.number}-{item.fullName}
            </p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default TodaysResults