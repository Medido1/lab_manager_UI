import labIcon from '/microscope.png'
import settingsIcon from '/settings.png'
import { InterfaceContext } from '../context/inferfaceContext';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import SettingsModal from './SettingsModal';
import DataLinks from './DataLinks';

function Header(){
  const {showSettings, setShowSettings} = useContext(InterfaceContext);
  const {user} = useContext(UserContext);

  return (
    <header 
      className="header p-4 flex justify-between relative"
    >
      <div className='flex items-center'>
        <img 
          src={labIcon} alt="lab Icon"
          className='h-10'
        />
        <h1 className='text-2xl font-bold'>My Lab Manager</h1>
      </div>
      <DataLinks />
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