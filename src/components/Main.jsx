import { useContext, useState } from "react";
import MainForm from "./MainForm";
import Ticket from "./Ticket";
import { PrintContext } from "../context/PrintContext";
import TodaysResults from "./TodaysResults";

function Main () {
  const {
    state, ticketRef, changeType,
    setName, setPrice, setPayedSum,
    handlePrint, setNumber
    } = useContext(PrintContext);

  const {type, fullName, price, payedSum, number} = state

  // handle multiple entries
  const [isMultiple, setIsMultiple] = useState(false);
  const [numberOfTests, setNumberOfTests] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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
          setNumber = {setNumber}
          isMultiple = {isMultiple}
          setIsMultiple = {setIsMultiple}
          numberOfTests = {numberOfTests}
          setNumberOfTests = {setNumberOfTests}
          totalPrice = {totalPrice}
          setTotalPrice = {setTotalPrice}
        />
        <Ticket 
          ref={ticketRef}
          type = {type}
          fullName = {fullName}
          price = {price}
          payedSum = {payedSum}
          number = {number}
          isMultiple = {isMultiple}
          numberOfTests = {numberOfTests}
          totalPrice = {totalPrice}
        />
        <TodaysResults />
      </section>
    </main>
  )
}

export default Main;