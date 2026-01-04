import { useEffect } from "react";

function EditForm({type, clientData, setClientData}) {
  const {number, fullName, price, remaining, phoneNumber} = clientData;

  const buttonStyle = `block mx-auto px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
  hover:scale-125 transition delay-100 bg-white`


  return (
    <div className="bg-blue-400 flex flex-col w-full rounded-lg p-4 ">
      <h2 className="font-bold text-center mb-4">
        Modifier Info
      </h2>
      <form >
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="type" className="w-[40%] sm:w-[27%] font-bold">
            Analyse
          </label>
          <select 
            value={type}
            name="type" 
            id="type"
            className="rounded-lg bg-white p-2"
            disabled={true}
          >
            <option value="Anapath">Anapath</option>
            <option value="Cytoponction">Cytoponction</option>
            <option value="F.C.V">FCV</option>
          </select>
        </div>
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
            focus:ring-2 focus:ring-blue-400 bg-white`}
            value={number}
            onChange={(e) => {
              setClientData({...clientData, number: e.target.value})
            }}
            disabled={true}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="fullName" className="w-[40%] sm:w-[27%] font-bold">
            Nom :
          </label>
          <input
            onChange={(e) => {
              setClientData({...clientData, fullName: e.target.value})
            }}
            value={fullName}
            type="text" 
            id="fullName" 
            autoComplete="off" 
            name="fullName"
            className={`w-[50%] sm:w-[40%]  p-2 rounded-lg border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400  bg-white`}
          />
        </div>
        <div className="flex gap-4  items-center mt-4">
          <label htmlFor="price" className="w-[40%] sm:w-[27%] font-bold">
            Prix Total :
          </label>
          <select  
            id="price"
            name="price"
            className="bg-white p-2 rounded-lg sm:w-[27%]"
            value={price}
            onChange={(e) => {
              setClientData({...clientData, price: e.target.value})
            }}
          >
            <option value="1000">1000</option>
            <option value="1500">1500</option>
            <option value="2000">2000</option>
            <option value="3000">3000</option>
            <option value="2500">2500</option>
            <option value="4000">4000</option>
          </select>
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
            value={price - remaining}
            onChange={(e) => {
              setClientData({...clientData, remaining: price - Number(e.target.value)})
            }}
            className="p-2 rounded-lg border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400 bg-white w-[24%] sm:w-[27%]"
          />
        </div>
        <div className="flex gap-4 items-center mt-4">
          <label htmlFor="phoneNumber" className="w-[40%] sm:w-[27%] font-bold">
            Telephone
          </label>
          <input 
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              setClientData({...clientData, phoneNumber: e.target.value})
            }}
            autoComplete="off"
            className="p-2 rounded-lg border-grey-300 focus:outline-none
            focus:ring-2 focus:ring-blue-400 bg-white w-[40%]"
          />
        </div>  
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className={buttonStyle}
          >
            Print
          </button>
          <button
            type="button"
            className={buttonStyle}
          >
            Save
          </button>
          <button
            type="button"
            className={`mx-auto bg-white px-4 py-2 rounded-full mt-4 shadow-lg cursor-pointer
            hover:scale-125 transition delay-150`}
            >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditForm;