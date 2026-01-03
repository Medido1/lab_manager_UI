import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

function Main () {
  const {user} = useContext(UserContext);
  useEffect(() => {
    console.log(user)
  }, [])
  return (
    <main>
      <h1>Hi {user.username}</h1>
    </main>
  )
}

export default Main;