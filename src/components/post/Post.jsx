import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import './post.css';



const Post = ({ post, delPost }) => {
    const { user } = useContext(Context);
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



    return (

        <div className="post">
            <div className="post__wrapper">
                <div className="post__img-container">
                    <img src="https://walldeco.ua/img/gallery/21/thumbs/thumb_l_0407.jpg" alt="" className="post__img" />
                </div>
                <div className="post__info-container">
                    <div className="post__content">
                        <h1 className="post__title">{post.title}</h1>
                        <p className="post__text">{post.text}</p>
                    </div>
                    <div className="post__info">
                        <div className="post__date">
                            <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                            <div className="post__author">Author: <b>{post.author}</b></div>
                        </div>
                        {user?.userEmail === post.email && (
                            <div className="post__icons">
                                <i className="post__icon fa-regular fa-pen-to-square" style={{ color: "purple" }}></i>
                                <i className="post__icon fa-solid fa-trash-can" style={{ color: "red" }} data-id={post._id} onClick={(e) => { delPost(e) }}></i>
                            </div>
                        )}
                    </div>
                    {/*   <Link to={{ pathname: '/editpost', search: `?id=${post._id}` }} data-id={post._id}>edit</Link> */}
                </div>
            </div>
        </div>



        /* <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt="" className="singlePostImg" />
                )}

                {updateMode
                    ? (<input type='text' defaultValue={title} autoFocus className="singlePostTitleInput" onChange={(e) => setTitle(e.target.value)} />)
                    :
                    (<h1 className="singlePostTitle">{title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)} ></i>
                                <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                            </div>
                        )}
                    </h1>)
                }

                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author:
                        <Link className='link' to={`/?user=${post.username}`}><b>{post.username}</b></Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>

                {updateMode ? (<textarea className="singlePostDescInput" defaultValue={desc} onChange={(e) => setDesc(e.target.value)} />)
                    : (<p className="singlePostDesc">{desc}</p>)
                }

                {updateMode && <button className="singlePostUpdate" onClick={handleUpdate}>Update</button>}

            </div>
        </div> */


    )
}
export default Post;