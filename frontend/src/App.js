import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Add Navigate here
import './App.css';
import LoginPage from './components/LoginPage';
import { LoginProvider, useLogin } from './utils/LoginContext';
import NavBar from './components/Navbar';
import { Insights } from './components/Insights';
import Inventory from './components/Inventory';
import Home from './components/Home';
import Logs from './components/Logs';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useLogin();
  return isLoggedIn() ? children : <Navigate to="/login" />; 
}

function MainPage() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path='/logs/*' element={<Logs/>}/>
        <Route path="/insights/*" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
        <Route path="/inventory/*" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
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
          
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
