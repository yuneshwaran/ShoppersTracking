import { Route, Routes } from 'react-router-dom';
import { Insights } from './Insights';
import NavBar from './Navbar';

function MainPage() {
  return (
    <div>
      <NavBar/>
      
      <Routes>

        <Route path='/insights/*' element={<Insights/>}></Route>

      </Routes>

    </div>
  );
}

export default MainPage;
