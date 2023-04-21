import './register.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import { LoginSuccess } from '../../context/Actions';


const Register = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { dispatch, isFetching, user } = useContext(Context);
    const navigate = useNavigate();
    








    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('https://zany-jade-chipmunk-cape.cyclic.app/auth/register', {
                username,
                email,
                password,
            });
            /*  dispatch({ type: 'LOGIN_SUCCESS', payload: res.data }); */
            dispatch(LoginSuccess(res.data));
           /*  res.data && window.location.replace('/profile'); */ //перезагружает всю страницу и загружает новую страницу с указанной URL-адресом /profile. Это называется полной перезагрузкой страницы. В результате, все данные в глобальном контексте, локальном хранилище (localStorage) и в других местах будут удалены, и приложение будет загружено снова, начиная с начала.
           navigate('/profile');
        } catch (err) {
            console.error('front error===', err.response.data);
            dispatch({ type: 'LOGIN_FAILURE' });
            setError(true);
        }
    };



    return (
        <div className="register">

            <div className="registerTitle">Register</div>
            <form action="" className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="">Username</label>
                <input className="registerInput" type="text" placeholder='username' onChange={e => setUserName(e.target.value)} />
                <label htmlFor="">Email</label>
                <input className="registerInput" type="email" placeholder='email' onChange={e => setEmail(e.target.value)} />
                <label htmlFor="">Password</label>
                <input className="registerInput" type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                <button className="registerButton" type='submit'>Register</button>
            </form>

            {error && <span style={{ color: 'red', marginTop: '10px' }}>{`User with such email: ${email} has already exist`}</span>}
        </div>
    )
}

export default Register;