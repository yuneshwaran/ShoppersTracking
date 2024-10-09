import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


import MainPage from './components/MainPage';
import Inventory from './components/Inventory';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/home/*' element={<MainPage/>}></Route>
        <Route path='/inventory' element={<Inventory/>}></Route>
        {/* <Route path='/product/:id' element={<Product/>}></Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
