import './App.css'
import Header from './components/Header'
import Login from './components/LogIn'
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import { UserContext } from './context/userContext';
import { useContext } from 'react';
import { Suspense} from 'react';
import Main from './components/Main';
import ProtectedRoute from './components/ProtectedRoute';
import ClientTable from './components/ClientTable'; 
import { DataContext } from './context/DataContext';
import Footer from './components/Footer';

function App() {
  const {user} = useContext(UserContext);
  const {anapathData, cytoponctionData, fcvData} = useContext(DataContext);

  const clientRoutes = [
    { path: '/anapath', type: 'Anapath', data: anapathData },
    { path: '/cytoponction', type: 'Cytoponction', data: cytoponctionData },
    { path: '/fcv', type: 'F.C.V', data: fcvData },
  ];
  
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
            {clientRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <ClientTable type={route.type} data={route.data} />
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  )
}

export default App
