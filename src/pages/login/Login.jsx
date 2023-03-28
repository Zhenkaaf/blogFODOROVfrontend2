import './login.css';
import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
/* import { Context } from '../../context/Context'; */
import axios from 'axios';

const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();
/*     const { dispatch, isFetching } = useContext(Context); */

    const handleSubmit = async (e) => {
        e.preventDefault();
       /*  dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            console.log('LOGIN_SUCCESS', res.data);
            userRef.current.value = '';
            passwordRef.current.value = '';
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE' });
        } */
    };



    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="">Username</label>
                <input className="loginInput" type="text" placeholder='username' ref={userRef} />
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