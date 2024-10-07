import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('user');
    const [password, setPassword] = useState('123');
    const [data,setData] = useState('Hello  ');

    useEffect(()=>{

        forFetch()
    },[])
    const onSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:8080', {
                auth: {
                    username: username,
                    password: password
                }
            });
            console.log(response);
        } catch (error) {
            console.log('Login error:', error.response || error.message);
        }
    };

    const forLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/logout', {}, {
                auth: {
                    username: username,
                    password: password,
                }
            });
            console.log(response);
            
        } catch (error) {
            console.log('Logout error:', error.response || error.message);
        }
    };

    const forFetch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/stock/3');
            console.log(response);
      
        } catch (error) {
            console.log('Fetch error:', error.response || error.message);
        }
    };

    return (
        <>
            <button onClick={onSubmit}>
                Try Login
            </button>
            <button onClick={forLogout}>
                Try Logout
            </button>
            <button onClick={forFetch}>
                Try Fetch
            </button>
            <p>
                {data}
            </p>
        </>
    );
}

export default Login;
