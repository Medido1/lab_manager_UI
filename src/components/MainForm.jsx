import { useContext, useEffect, useState } from 'react';
import {UserContext} from '../context/userContext';
import { DataContext } from '../context/DataContext';
import { InterfaceContext} from '../context/inferfaceContext';
import { addClientAPI, addMultipleClientsAPI} from '../api/clientApi';

function MainForm({
  state, changeType, setName, 
  setPrice, setPayedSum, handlePrint,
  setNumber, isMultiple, setIsMultiple,
  numberOfTests, setNumberOfTests, totalPrice,
  setTotalPrice
  }) {
  const {type, fullName, price, payedSum, number} = state
  const {user} = useContext(UserContext);
  const {anapathData, cytoponctionData, fcvData, refreshData} = useContext(DataContext);
  const {darkMode} = useContext(InterfaceContext);

  // handle multiple entries
  const [lastNumber, setLastNumber] = useState(0);

  useEffect(() => {
    setLastNumber((parseInt(number) + parseInt(numberOfTests)) - 1)
  },[numberOfTests])

  useEffect(() => {
    if (numberOfTests !== 0) {
      setTotalPrice(parseInt(numberOfTests) * 800) /* edge case for this lab  */
    }
  }, [numberOfTests])

  const buttonStyle = `block mx-auto px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
  hover:scale-125 transition delay-100 ${darkMode ? 'bg-gray-700' : 'bg-white'}`

  function isFormValid() {
    return type && fullName && price 
  }

  function cancelInput() {
    changeType("");
    setNumber("");
    setName("");
    setPrice("");
    setPayedSum("");
  }

  /* get last entry number and update form number to next entery */
  function getNextClientNumber(e) {
    const currentType = e.target.value;
    changeType(currentType);
    let latestNumber;

    if (currentType === "Anapath") {
      if (anapathData.length === 0) {
        latestNumber = 0;
      } else {
        latestNumber = Math.max(...anapathData.map(client => (client.number)))
      }
    } else if (currentType === "Cytoponction") {
      if (cytoponctionData.length === 0) {
        latestNumber = 0;
      } else {
        latestNumber = Math.max(...cytoponctionData.map(client => (client.number)))
      }
    } else if (currentType === "F.C.V") {
      if (fcvData.length === 0) {
        latestNumber = 0
      } else {
        latestNumber = Math.max(...fcvData.map(client => client.number))
      }
    };
    setNumber(latestNumber + 1);
  }

  function calculateEndDate(type, currentDay = new Date()) {
    let daysLeft;
    if (type === "Anapath") {
      daysLeft = 12;
    } else if (type === "Cytoponction") {
      daysLeft = 1;
    } else if (type === "F.C.V") {
      daysLeft = 5
    }

    /* create copy to calculate new date */
    const endDate = new Date(currentDay)
    endDate.setDate(endDate.getDate() + daysLeft);
    const dayOfWeek = endDate.getDay();
   
    /* if the resulting day if friday skip to saturday */
    if (dayOfWeek === 5) {
      endDate.setDate(endDate.getDate() +1)
    }
    return endDate;
  }

  async function addMultipleClients() {
    if (!isFormValid() || numberOfTests < 1 ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
  
    const token = localStorage.getItem('authToken');
    const endDateObj = calculateEndDate(type);
    let clientList = []

    for (let i = 0; i < numberOfTests; i++) {
      const newClient = {
        type,
        number: number + i,
        fullName,
        price: totalPrice,
        payedSum: Number(payedSum),
        user: user.username,
        endDate: endDateObj
      }

      clientList.push(newClient);
    } 
    addMultipleClientsAPI(clientList, refreshData, cancelInput)

  }

  async function addClient() {
    if (!isFormValid()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const endDateObj = calculateEndDate(type);

    const newClient = {
      type,
      number,
      fullName,
      price,
      payedSum: Number(payedSum),
      user: user.username,
      endDate: endDateObj
    }
    addClientAPI(newClient, refreshData, cancelInput)
  }

  const inputBg = `${darkMode ? 'bg-black': 'bg-white'}`

  return (
    <form 
      className={`${darkMode ? 'form_dark text-white': 'form'} px-4 py-8 rounded-md sm:w-full md:w-[30%]`} 
    >
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="type" className="w-[40%] sm:w-[27%] font-bold">
          Analyse
        </label>
        <select 
          value={type}
          onChange={(e) => getNextClientNumber(e)}
          name="type" 
          id="type"
          className={`rounded-lg p-2 ${inputBg}`}
        >
          <option value="">select</option>
          <option value="Anapath">Anapath</option>
          <option value="Cytoponction">Cytoponction</option>
          <option value="F.C.V">FCV</option>
        </select>
      </div>
      {isMultiple &&  
        <div className="flex gap-4 mb-4">
          <label htmlFor="numberOfTests" className="w-[40%] sm:w-[27%] font-bold">
            Nombre des tests:
          </label>
          <input 
            className={`w-[27%] p-2 rounded border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400 ${inputBg}`}
            type="number" name="numberOfTests" id="numberOfTests" 
            min="0" value={numberOfTests} onChange={(e) => setNumberOfTests(e.target.value)}
          />
        </div>
      }
      <div className="flex gap-4 items-center mb-4">
        <label htmlFor="number" className="w-[40%] sm:w-[27%] font-bold">
          Numero :
        </label>
        <input 
          type="number" 
          id="number"
          name="number"
          min="0"
          className={`w-[27%] p-2 rounded-lg border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${inputBg}`}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      {isMultiple && 
        <div className="flex gap-4 items-center mb-4">
          <label htmlFor="lastNumber" className="w-[40%] sm:w-[27%] font-bold">
            A :
          </label>
        <input 
          className={`w-[27%] p-2 rounded border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 bg-black ${inputBg}`}
          type="lastNumber" 
          id="lastNumber"
          value={lastNumber ? lastNumber : ""} min="0"
          readOnly
        />
        </div>
      }
      <div className="flex gap-4 items-center">
        <label htmlFor="fullName" className="w-[40%] sm:w-[27%] font-bold">
          Nom :
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={fullName}
          type="text" 
          id="fullName" 
          autoComplete="off" 
          name="fullName"
          className={`w-[50%] sm:w-[40%] p-2 rounded-lg border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 ${inputBg}`}
        />
      </div>
      <div className="flex gap-4  items-center mt-4">
        <label htmlFor="price" className="w-[40%] sm:w-[27%] font-bold">
          Prix Total :
        </label>
        {!isMultiple && 
          <select  
            onChange = {(e) => setPrice(e.target.value)}
            id="price"
            className={`p-2 rounded-lg sm:w-[27%] ${inputBg}`}
            value={price}
          >
            <option value="1000">1000</option>
            <option value="1500">1500</option>
            <option value="2000">2000</option>
            <option value="2500">2500</option>
            <option value="4000">4000</option>
          </select>
        }
        {isMultiple &&  
          <div>
            <input 
              className={`p-2 rounded border-grey-300 focus:outline-none
              focus:ring-2 focus:ring-blue-400 w-[27%] ${inputBg}`}
              readOnly
              name="totalPrice" id="totalPrice" 
              value={totalPrice}
             />
          </div>
        }
      </div>
      <div className="flex gap-4 items-center mt-4">
        <label htmlFor="payedSum" className="w-[40%] sm:w-[27%] font-bold">
          Prix payée :
        </label>
        <input
          type="number" 
          min="0" 
          id="payedSum"
          name="payed"
          value={payedSum}
          onChange={(e) => setPayedSum(e.target.value)}
          className={`p-2 rounded-lg border-grey-300 focus:outline-none
          focus:ring-2 focus:ring-blue-400 w-[24%] sm:w-[27%] ${inputBg}`}
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className={buttonStyle}
          onClick={() => {
            if (!isFormValid()) {
              alert("Veuillez remplir tous les champs obligatoires.");
              return;
            } else {
              handlePrint()
            }
          }
        } 
        >
          Print
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={isMultiple ? addMultipleClients : addClient}
        >
          Save
        </button>
        <button
          type="button"
          onClick={cancelInput}
          className={`mx-auto px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
            hover:scale-125 transition delay-150 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
          >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => setIsMultiple(!isMultiple)}
          className={`mx-auto px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
            hover:scale-125 transition delay-150 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
          >
          Multiple
        </button>
      </div>
    </form>
  )
}

export default MainForm;