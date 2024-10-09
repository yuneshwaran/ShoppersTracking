
import { useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosInstance';
import {removeToken} from '../utils/jwt'
import { useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function NavBar() {

  const navigate = useNavigate();

  const logout = () => {
    const confirm = window.confirm("are you sure?");
    if(confirm){
      localStorage.removeItem('jwt'); 
      navigate('/');
    }else {
        
        window.location.href = window.location.href;
    }
    

  };

  const [isAdmin,setIsadmin] = useState(false);

  const handleLogout = async () => {
    try {
      console.log("called")
      await axiosInstance.post('/logout'); 
      removeToken(); 
      window.location.href = '/login'; // 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (

    <nav class="navbar navbar-expand-sm bg-body-tertiary shadow">
      <div class="container-fluid">
        <a class="navbar-brand fs-4 badge bg-dark text-light" href="/home">Shoppers Tracker</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href='/home/insights'>Insights</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href='/inventory' >Inventory</a>
            </li>
            <li className='nav-item'>
              <a className={`nav-link ${isAdmin ? '' :'disabled'}`} href='register'>Add User</a>
            </li>
          </ul>
          <span class="navbar-text">
            <ul className='navbar-nav'>
              <li>
                <button onClick={()=>{logout()}}>
                  Logout
                </button>
              </li>
            </ul>
            
          </span>
        </div>
      </div>
    </nav>

  );
}

export default NavBar;