// import React, { createContext, useState, useContext } from 'react';
// import {useJwt} from "react-jwt"


// export const AuthProvider = () => {

//   const [token, setToken] = useState(localStorage.getItem('jwt') || null);

//   const login = async (username, password) => {
//     try {
//       const response = await fetch('http://localhost:8080/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
//       if (!response.ok) {
//         throw new Error('Login failed');
//       }
//       const jwt = await response.text();
//       setToken(jwt);
//       localStorage.setItem('jwt', jwt);
//       return true;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem('jwt'); // Remove JWT from localStorage
//   };


//   const authFetch = async (url, options = {}) => {
//     const headers = {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//     };
//     const response = await fetch(url, { ...options, headers });
//     return response;
//   };
  
//   const JWTDecode =  ()=> {
//     const token = localStorage.getItem("jwt")
  
//     const { decodedToken } = useJwt(token);
//     console.log(decodedToken)
//     return decodedToken;
//   }

// };


  