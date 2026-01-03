import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import MainForm from "./MainForm";

function Main () {
  const {user} = useContext(UserContext);
  useEffect(() => {
    console.log(user)
  }, [])
  return (
    <main
     className="p-4 flex-grow flex-col md:flex-row md:justify-center bg-gray-200"
    >
      <section
        className="flex flex-col sm:flex-row w-full gap-4"
      >
        <MainForm />
      </section>
    </main>
  )
}

export default Main;