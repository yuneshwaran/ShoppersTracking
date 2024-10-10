import { Route, Routes } from 'react-router-dom';
import NavBar from './Navbar';

import { Insights } from './Insights';
import Inventory from './Inventory';
import Home from './Home';

function MainPage() {
  return (
    <div>
      <NavBar />


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/insights/*' element={<Insights />} />
        <Route path='/inventory/*' element={<Inventory />} />
      </Routes>
    </div>
  );
}

export default MainPage;
