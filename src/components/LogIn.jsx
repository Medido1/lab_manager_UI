import { useState } from "react";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div  className="w-full max-w-md flex-grow self-center mt-[10%]">
      <form className="flex flex-col items-center bg-gray-200 max-h-64 p-4 rounded-2xl w-full">
        <h2 className="text-2xl font-bold text-center mb-4">
          Welcome
        </h2>
        <div className="flex flex-col gap-2 mb-4 text-xl font-bold">
          <label htmlFor="username">UserName</label>
          <input 
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setMessage("");
              setUserName(e.target.value)
            }}
            required
            autoComplete="off"
            className="p-2 border border-gray-200 rounded-lg bg-blue-400 text-white"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4 text-xl font-bold">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=" p-2 border border-gray-200 rounded-lg bg-blue-600 text-white"
          />
        </div>
        <button 
          type="submit"
          className="rounded-full px-6 py-4 mt-4 bg-blue-200 cursor-pointer text-xl
          transition duration-200 ease-in-out hover:scale-125 font-bold">
          LogIn
        </button>
      </form>
    </div>
  )
}

export default Login;