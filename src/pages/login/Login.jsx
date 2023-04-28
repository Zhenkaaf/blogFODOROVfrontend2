import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import { WatchSpinner } from '../../loadingSpinner/LoadingSpinner';




const Login = () => {

    const userEmailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { user, dispatch, isFetching } = useContext(Context);
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
            /*  const res = await axios.post('http://localhost:8001/auth/login', { */
            const res = await axios.post('https://zany-jade-chipmunk-cape.cyclic.app/auth/login', {
                useremail: userEmailRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            navigate('/profile');
        } catch (err) {
            console.error(err);
            userEmailRef.current.value = '';
            passwordRef.current.value = '';
            dispatch({ type: 'LOGIN_FAILURE' });
            setError(true);
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
                {isFetching ? (<button className="watch__spinner-login" disabled={true} ><WatchSpinner /></button>) : (<button className="loginButton" type='submit' /* disabled={isFetching} */>Login</button>)}

            </form>
            <div>{error && <span style={{ color: 'red', marginTop: '10px' }}>Something went wrong!</span>}</div>



        </div>
    )
}
export default Login;