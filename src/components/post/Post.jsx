import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import './post.css';
import { Popup } from '../../portal/Popup';




const Post = ({ post, delPost }) => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    /*     const PF = 'http://localhost:5000/images/';
        const location = useLocation();
        const path = location.pathname.split('/')[2];
        const [post, setPost] = useState({});
        const { user } = useContext(Context);
        const [title, setTitle] = useState('');
        const [desc, setDesc] = useState('');
        const [updateMode, setUpdateMode] = useState(false);
    
        useEffect(() => {
            const getPost = async () => {
                const res = await axios.get('/posts/' + path);
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.desc);
            };
            getPost();
        }, [path]);
    
    
        const handleDelete = async () => {
            try {
                await axios.delete(`/posts/${post._id}`, {
                    data: { username: user.username },
                });
                window.location.replace('/');
            } catch (err) {
                console.log(err);
            }
        };
    
        const handleUpdate = async () => {
            try {
                await axios.put(`/posts/${post._id}`, {
                    username: user.username,
                    title,
                    desc,
                });
               
                setUpdateMode(false)
            } catch (err) {
                console.error(err);
            }
        }; */
    // Обработчик закрытия окна
    const handleClose = () => {
        setIsOpen(false);
    };



    return (
        <div className="post">

            <div className="post__wrapper">
                <div className="post__img-container">
                <Link className='link' to={`/post/${post._id}`}><img src={post.picture ? post.picture : 'https://i.postimg.cc/x1wg19Hk/26345obil.jpg'} alt="" className="post__img" /></Link>
                </div>
                <div className="post__info-container">
                    <div className="post__content">
                        <Link className='link' to={`/post/${post._id}`}/* to={`/post/${post._id}`} */><h1 className="post__title">{post.title}</h1></Link>
                        <p className="post__text">{post.text}</p>
                    </div>
                    <div className="post__info">
                        <div className="post__date">
                            <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                            <div className="post__author">Author: <b>{post.author}</b></div>
                        </div>
                        {user?.userEmail === post.email && (
                            <div>
                                <div>
                                    {isOpen && <Popup isOpen={isOpen} onClose={handleClose} postId={post._id} onDelete={delPost} />}
                                </div>
                                <div className="post__icons">
                                    <i className="post__icon fa-regular fa-pen-to-square" style={{ color: "purple" }} onClick={(e) => { navigate(`/post/${post._id}`, { state: { mode: true } }); }}></i>
                                    <i className="post__icon fa-solid fa-trash-can" style={{ color: "red" }} data-id={post._id} onClick={() => { setIsOpen(true) }}></i>
                                </div>
                            </div>


                        )}
                    </div>
                    {/*   <Link to={{ pathname: '/editpost', search: `?id=${post._id}` }} data-id={post._id}>edit</Link> */}
                </div>
            </div>
        </div>
    )
}
export default Post;