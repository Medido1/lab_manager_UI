import './App.css'
import Header from './components/Header'
import Login from './components/LogIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/userContext';
import { useContext, useEffect } from 'react';
import { Suspense} from 'react';
import Main from './components/Main';
import ProtectedRoute from './components/ProtectedRoute';
import ClientTable from './components/ClientTable'; 
import { DataContext } from './context/DataContext';
import Footer from './components/Footer';
import { Navigate } from 'react-router-dom';

function App() {
  const {user} = useContext(UserContext);
  const {anapathData, cytoponctionData, fcvData} = useContext(DataContext);
  
  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <Suspense fallback={<div className='text-center text-2xl'>Loading ...</div>}>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/main" replace /> : <Login />}
            />
            <Route path="/main" element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }/>
            <Route path='/anapath' element={
              <ProtectedRoute>
                <ClientTable type="Anapath" data={anapathData}/>
              </ProtectedRoute>
              }
            />
            <Route path='/cytoponction' element={
              <ProtectedRoute>
                <ClientTable type="Cytoponction" data={cytoponctionData}/>
              </ProtectedRoute>
            }/>
            <Route path='/fcv' element={
              <ProtectedRoute>
                <ClientTable type="F.C.V" data={fcvData}/>
              </ProtectedRoute>
            }/>
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  )
}

export default App
