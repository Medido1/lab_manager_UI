import { useContext, useEffect } from "react";
import MainForm from "./MainForm";
import Ticket from "./Ticket";
import { PrintContext } from "../context/PrintContext";

function Main () {
  const {
    state, ticketRef, changeType,
    setName, setPrice, setPayedSum,
    handlePrint
    } = useContext(PrintContext);

  const {type, fullName, price, payedSum} = state

  return (
    <main
     className="p-4 flex-grow flex-col md:flex-row md:justify-center bg-gray-200"
    >
      <section
        className="flex flex-col sm:flex-row w-full gap-4"
      >
        <MainForm
          state = {state}
          changeType = {changeType}
          setName = {setName}
          setPrice = {setPrice}
          setPayedSum = {setPayedSum}
          handlePrint = {handlePrint}
        />
        <Ticket 
          ref={ticketRef}
          type = {type}
          fullName = {fullName}
          price = {price}
          payedSum = {payedSum}
        />
      </section>
    </main>
  )
}

export default Main;