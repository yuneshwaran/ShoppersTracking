import './Login.css';

function Login(){
return(
    <div className='container'>
        <div className='form-body'>
            <label className='heading-label'>Login</label>
            <div className='fields'>
                <label>Username</label>
                <input type='text' placeholder='Username'></input>
            </div>
            <div className='fields'>
                <label>Password</label>
                <input type='password' placeholder='********'></input>
            </div>
        </div>
    <div className='button-container'>
        <button>Submit</button>
    </div>
    </div>
)
}

export default Login;