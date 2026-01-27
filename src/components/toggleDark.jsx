import { useState, useEffect, useContext } from "react";
import darkIcon from '/dark.png';
import lightIcon from '/light.png';
import { InterfaceContext } from "../context/inferfaceContext";

function ToggleDark() {
  const [themeIndex, setThemeIndex] = useState(0);
  const {setDarkMode} = useContext(InterfaceContext);

  const positions = ["left-1", "left-[68%]"];
  const themes = ["dark", "light"];
  
  function handleToggle() {
    setThemeIndex((prev) => (prev + 1) % positions.length);
    setDarkMode((prev) => !prev);
  }

  useEffect(() => {/* load last used them or preferd theme */
    const savedTheme = localStorage.getItem("theme"); 
    if (savedTheme && themes.includes(savedTheme)) {
      const savedIndex = themes.indexOf(savedTheme)
      setThemeIndex(savedIndex)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const defaultTheme = prefersDark ? 1: 0;
      setThemeIndex(defaultTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", themes[themeIndex])
  }, [themeIndex])

  const toggleBtnClass = `absolute rounded-[50%] bg-gray-400 w-[20%] 
    aspect-square top-1 ${positions[themeIndex]} transition-all duration-300`
  return (
    <div>
      <div className="ml-2 flex gap-10 mb-0.5 pb-2">
        <img src={darkIcon} alt="toggle dark mode" className="h-5"/>
        <img src={lightIcon} alt="toggle light mode" className="h-5"/>
      </div>
      <div 
        onClick={handleToggle}
        className="rounded-xl h-7 w-[100px] relative bg-gray-200">
        <button  className={toggleBtnClass}></button>
      </div>
    </div>
  )
}

export default ToggleDark