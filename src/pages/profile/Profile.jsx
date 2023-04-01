import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
/* import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context'; */
import './profile.css';




const Profile = () => {
    const {dispatch, isFetching, user} = useContext(Context);

        console.log('profile user====', user);

        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
/*     const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
   
    
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const PF = 'http://localhost:5000/images/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: 'UPDATE_START'});
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            updatedUser.profilePic = filename;
            try {
                await axios.post('/upload', data);
            } catch (err) {
                console.error(err);
            }
        }
        try {
            const res = await axios.put('/users/' + user._id, updatedUser);
            setSuccess(true);
            dispatch({type: 'UPDATE_SUCCESS', payload: res.data});
        } catch (err) {
            console.error(err);
            dispatch({type: 'UPDATE_FAILURE'});
        }
    }; */

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Hello {user.userName} Update Your Account</span>
                </div>
                <form action="" className="settingsForm" /* onSubmit={handleSubmit} */>
                    <label htmlFor="">Profile Picture</label>
                    <div className="settingsPP">
                        <img src='https://aif-s3.aif.ru/images/019/507/eeba36a2a2d37754bab8b462f4262d97.jpg'/* {file ? URL.createObjectURL(file) : PF + user.profilePic} */ alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id='fileInput' style={{ display: 'none' }} /* onChange={(e) => setFile(e.target.files[0])} */ />
                    </div>
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />

                    <label htmlFor="">Email</label>
                    <input type="text" placeholder={user.email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="">Password</label>
                    <input type="password" /* onChange={e => setPassword(e.target.value)} *//>

                    <button className="settingsSubmit" type='submit'>Update</button>
                  {/*   {success && <span style={{color: 'green', textAlign: 'center', marginTop: '10px'}}>User has been updated!</span>} */}
                </form>
            </div>
        </div>
    )
}
export default Profile;