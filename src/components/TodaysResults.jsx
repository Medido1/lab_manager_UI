import {useContext, useEffect, useMemo } from "react";
import { DataContext } from "../context/DataContext";

function TodaysResults() {
  const { anapathData, cytoponctionData,fcvData} = useContext(DataContext);

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

  return (
    <div className={`bg-blue-200 results px-4 py-2 sm:flex-grow rounded-lg`}>
      <h1 className="text-2xl text-center font-bold">
        Résultats {todayDisplay}
      </h1>
      <h2 className="text-lg sm:text-xl font-bold border-b-2
       border-black w-[30%] sm:w-[20%]">
        Anapath :
      </h2>
      <ul className="ml-2">
        {anapathToday.map(item => 
          <li key={item.id}>
            <p className="font-bold text-lg">
              {item.number}-{item.fullName}
            </p>
          </li>
        )}
      </ul>
      <h2 className="text-lg sm:text-xl font-bold border-b-2 border-black 
      w-[45%] sm:w-[30%] mt-4">
        Cytoponction :
      </h2>
      <ul className="ml-2">
        {cytoponctionToday.map(item => 
          <li key={item.id}>
            <p className="font-bold text-lg">
              {item.number}-{item.fullName}
            </p>
          </li>
        )}
      </ul>
      <h2 className="text-lg sm:text-xl font-bold border-b-2 
      border-black w-[16%] sm:w-[10%] mt-4">
        FCV :
      </h2>
      <ul className="ml-2">
        {FCVToday.map(item => 
          <li key={item.id}>
            <p className="font-bold text-lg">
              {item.number}-{item.fullName}
            </p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default TodaysResults