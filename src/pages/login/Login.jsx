import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';



const Login = () => {

    const userEmailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    
    
    const { user, dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('http://localhost:8001/auth/login', {
                useremail: userEmailRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            navigate('/profile');
           
            userEmailRef.current.value = '';
            passwordRef.current.value = '';
        } catch (err) {
            console.error(err);
            dispatch({ type: 'LOGIN_FAILURE' });
        }
    };


   
   
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="">Useremail</label>
                <input className="loginInput" type="text" placeholder='useremail' ref={userEmailRef} />

                <label htmlFor="">Password</label>
                <input className="loginInput" type="password" placeholder='password' ref={passwordRef} />

                <button className="loginButton" type='submit' /* disabled={isFetching} */>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className='link' to='/register'>REGISTER</Link>
            </button>
           
        </div>
    )
}
export default Login;