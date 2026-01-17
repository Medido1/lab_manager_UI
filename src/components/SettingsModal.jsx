import { useContext } from "react";
import { InterfaceContext } from "../context/inferfaceContext";
import { UserContext } from "../context/userContext";
import logoutIcon from '/logout.png';
import { motion, AnimatePresence } from "framer-motion";

function SettingsModal() {
  const {showSettings, setShowSettings} = useContext(InterfaceContext);
  const {setUser} = useContext(UserContext);

  const token = localStorage.getItem('authToken');

  const modalAnimation = {
    initial: {y:-100},
    animate: {y: 0},
    transition: { duration: 0.6, ease: "easeOut" },
    exit: {opacity: 0, transition: { duration: 0.6, ease: "easeInOut" }},
  }

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setShowSettings(false)
  }

  const isTokenExpired = () => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      true
    }
  }

  if (isTokenExpired(token)) {
    handleLogOut();
  }
  return (
    <AnimatePresence>
      {showSettings &&
        <motion.div 
          {...modalAnimation}
          className="bg-blue-200 p-4 rounded-2xl absolute top-[80%] right-[1%]"
        >
          <div className="flex gap-2">
            <img src={logoutIcon} alt="logout" className="h-6" />
            <button 
            onClick={handleLogOut}
            className='hover:border-b-2 cursor-pointer font-bold'>
              Log out
            </button>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default SettingsModal;