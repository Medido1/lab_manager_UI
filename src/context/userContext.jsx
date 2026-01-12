import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null
  });

  const [message, setMessage] = useState("");
  const API_BASE_URL = "https://192.168.56.1:8000";

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

  const handleLogOut = async() => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/logout`, {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "failed to logout");
      } else {
        setMessage("Logged out!");
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return(
    <UserContext.Provider value={{user, setUser, handleLogOut}}>
      {children}
    </UserContext.Provider>
  )
}