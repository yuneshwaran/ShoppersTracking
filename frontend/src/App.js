import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import LoginPage from './components/LoginPage';
import { LoginProvider, useLogin } from './utils/LoginContext';
import NavBar from './components/Navbar';
import { Insights } from './components/Insights';
import Inventory from './components/Inventory';
import Home from './components/Home';
import Logs from './components/Logs/Logs';
import Entity from './components/Entities/EntityMain';
import ErrorPage from './components/ErrorPage';
import { AddEntities } from './components/Entities/AddEntities';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useLogin();
  return isLoggedIn() ? children : <Navigate to="/login" />; 
}

function MainPage() {
  return (
    <div>
      <NavBar />
        <Routes>
          <Route path="/*" element={<Home />} /> 
          <Route path='/logs/*' element={<ProtectedRoute><Logs/></ProtectedRoute>}/>
          <Route path='/entity/*' element={<ProtectedRoute><Entity/></ProtectedRoute>}/>
          <Route path="/insights/*" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
          <Route path="/inventory/*" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/add/*" element={<ProtectedRoute><AddEntities /></ProtectedRoute>} />
        </Routes>
    </div>
  );
}

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/*" element={<MainPage />} />
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
