import './App.css'
import Header from './components/Header'
import Login from './components/LogIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/userContext';
import { useContext } from 'react';
import { Suspense} from 'react';
import Main from './components/Main';

function App() {
  const {user} = useContext(UserContext);
  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <Suspense fallback={<div className='text-center text-2xl'>Loading ...</div>}>
          <Routes>
            <Route path="/" element={
              user ? <Main /> : <Login />
            }/>
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
