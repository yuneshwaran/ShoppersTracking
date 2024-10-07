import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import FetchTest from './components/FetchTest';
import Product from './components/Product';
import Inventory from './components/Inventory';
import MainPage from './components/MainPage';
import ShelfSensorLogs from './components/ShelfSensorLogs';
import TrialRoomLog from './components/TrialRoomLog';
import TrialToPurchase from './components/TrialToPurchase';
import Login from './components/FetchTest';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home/*' element={<MainPage/>}></Route>
        <Route path='/inventory' element={<Inventory/>}></Route>
        <Route path='/product/:id' element={<Product/>}></Route>
        <Route path='/test' element={<FetchTest/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
