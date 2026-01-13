import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null
  });

  const [message, setMessage] = useState("");
  const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:8000"
  : "https://192.168.56.1:8000"

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          // Send the token in the Authorization header
          const res = await fetch(`${API_BASE_URL}/users/profile`, {
            method: "get",
            headers: {"Authorization": `Bearer ${token}`}
          })

          if (res.ok) {
            const data = await res.json()
            setUser(data.user)
          } else {
            // Token is invalid/expired, clear it
            localStorage.removeItem('authToken');
          }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            localStorage.removeItem('authToken');
        }
      }
    }; checkAuth()
  }, [])

  return(
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}