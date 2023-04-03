import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
/* import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context'; */
import './profile.css';
import Post from '../Post';




const Profile = () => {
    const { dispatch, isFetching, user } = useContext(Context);

    console.log('profile user====', user);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [myPosts, setMyPosts] = useState(null);
    console.log(myPosts);

    useEffect(() => {
        const fetchPersonalPosts = async () => {
            try {
                /*  let myPosts = await axios.get(`https://zany-jade-chipmunk-cape.cyclic.app/posts?email=${user.userEmail}`); */
                let personalPosts = await axios.get(`http://localhost:8001/posts/${user.userEmail}`);
                console.log('myPosts===', personalPosts);
                setMyPosts(personalPosts.data)
            } catch (err) {
                console.error(err);
            }
        };
        fetchPersonalPosts();

    }, [user]);

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
                    <input type="text" placeholder={user.userName} onChange={e => setUsername(e.target.value)} />

                    <label htmlFor="">Email</label>
                    <input type="text" placeholder={user.userEmail} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="">Password</label>
                    <input type="password" /* onChange={e => setPassword(e.target.value)} */ />

                    <button className="settingsSubmit" type='submit'>Update</button>
                    {/*   {success && <span style={{color: 'green', textAlign: 'center', marginTop: '10px'}}>User has been updated!</span>} */}
                </form>
            </div>
            <h1>Post:</h1>
            {myPosts && (
                <div>
                
                <ul>{
                    myPosts.map(post => (
                        <li key={post._id}>
                            <article >
                                <h2>
                                   {/*  <a href="/posts/1"> */}{post.title}{/* </a> */}
                                </h2>
                                <p>{post.text}</p>
                                <div className='info'>
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                   {/*  <Link to={{ pathname: '/editpost', search: `?id=${post._id}` }} data-id={post._id}>edit</Link> */}
                                    <button data-id={post._id} /* onClick={(e) => {delPost(e)}} */>delete</button>
                                    <span>Author: {post.author}</span>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    )
}
export default Profile;