import { createContext, useRef, useReducer} from "react";
import { useReactToPrint } from "react-to-print";
import AppReducer from "./AppReducer";

export const initialState = {
  type: "",
  number: "",
  fullName: "",
  price: "",
  payedSum: "",
  phoneNumber: "//",
  endDate: ""
}

export const PrintContext = createContext(initialState);

export const PrintProvider = ({children}) => {
  /* printing stats */
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const ticketRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `${state.fullName}`,
    contentRef: ticketRef
  })

  function changeType (type) {
    dispatch({
      type: "CHANGE_TYPE", payload: type, })
  }

  function setName (fullName) {
    dispatch({
      type: "SET_NAME", payload: fullName})
  }

  function setPrice (price) {
    dispatch({type: "SET_PRICE", payload: price})
  }

  function setPayedSum (payedSum) {
    dispatch ({
      type: "SET_PAYED_SUM", payload: payedSum})
  }

  const value = {state, ticketRef, changeType, setName,
    setPrice, setPayedSum, handlePrint
  }

  return (
    <PrintContext.Provider value={value}>
      {children}
    </PrintContext.Provider>
  )
}