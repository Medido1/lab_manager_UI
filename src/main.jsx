import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {UserProvider} from './context/userContext.jsx';
import { InterfaceProvider } from './context/inferfaceContext.jsx';
import { PrintProvider } from './context/PrintContext.jsx';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <InterfaceProvider >
        <PrintProvider >
          
            <App />
         
        </PrintProvider>
      </InterfaceProvider>
    </UserProvider>
  </StrictMode>,
)