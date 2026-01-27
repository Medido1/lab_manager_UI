import labIcon from '/microscope.png'
import settingsIcon from '/settings.png'
import { InterfaceContext } from '../context/inferfaceContext';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import SettingsModal from './SettingsModal';
import DataLinks from './DataLinks';
import ToggleDark from './toggleDark';

function Header(){
  const {showSettings, setShowSettings, darkMode} = useContext(InterfaceContext);
  const {user} = useContext(UserContext);

  return (
    <header 
      className={`${darkMode ? 'header_dark' : 'header'} p-4 flex justify-between relative`}
    >
      <div className='flex items-center'>
        <div className={`${darkMode ? 'p-2 rounded-lg bg-slate-400' : ''}`}>
          <img
            src={labIcon} alt="lab Icon"
            className='h-10'
          />
        </div>
        <h1 className={`${darkMode ? 'text-white': 'text-black'} text-2xl font-bold`}>
          My Lab Manager
        </h1>
      </div>
      {user && <DataLinks />}
      {user && <ToggleDark />}
      {user && 
        <button>
          <img 
            src={settingsIcon}
            alt="settings"
            className="h-6 cursor-pointer"
            onClick={() => setShowSettings(!showSettings)}
          />
        </button>
      }
      <SettingsModal />
    </header>
    )
}

export default Header;