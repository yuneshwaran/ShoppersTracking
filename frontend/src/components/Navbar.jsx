
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import React from "react";
import {} from './LoginPage'


function NavBar() {

  const navigate = useNavigate();

  const [jwt, setJWT] = useState(localStorage.getItem('jwt'))

  const logout = () => {
    const confirm = window.confirm("are you sure?");
    if(confirm){
      localStorage.removeItem('jwt'); 
      setJWT(null)

      navigate('/');
    }else {
        
        window.location.href = window.location.href;
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
              <a class="nav-link active" aria-current="page" href='/home'>Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href='/home/insights/shelf'>Insights</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href='/home/inventory' >Inventory</a>
            </li>
            <li className='nav-item'>
              <a className="nav-link disabled" href='register'>Add User</a>
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