import './singlepost.css';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';



const SinglePost = () => {
    const { user } = useContext(Context);
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');

    const location = useLocation();
    const path = location.pathname.split('/')[2];
  
    if (user && post) {
        console.log(user);
        console.log(post.email);
      }

    const updateMode = false;

    useEffect(() => {
        const getPost = async () => {
            try {
               /*  const res = await axios.get(`http://localhost:8001/posts/${path}`); */
               const res = await axios.get(`https://zany-jade-chipmunk-cape.cyclic.app/posts/${path}`);
                setPost(res.data);
                setTitle(res.data.title);
            } catch (err) {
                console.error(err);
            }
        };
        getPost();
    }, [path]);


    const setUpdateMode = () => {

    };
    const handleDelete = () => {

    };

    return (
        <div className="singlePost">
            <div className="singlePost__wrapper">

                <div className="singlePost__imgBlock">
                    <img className="singlePost__img" src='https://images.pexels.com/photos/12629369/pexels-photo-12629369.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                </div>


                <div className="singlePost__content">
                    {updateMode
                        ? (<input type='text' defaultValue={title} autoFocus className="singlePost__title-edit-input" onChange={(e) => setTitle(e.target.value)} />)
                        :
                        (<h1 className="singlePost__title">{title}</h1>)
                    }




                    {updateMode ? (<textarea className="singlePost__text-edit-textarea" defaultValue={post?.text} /* onChange={(e) => setDesc(e.target.value)} */ />)
                        : (<p className="singlePost__text">{post?.text}</p>)
                    }

                    <div className="singlePost__info">
                        <div className="singlePost__date">{new Date(post?.createdAt).toLocaleDateString()}</div>
                        <div className="singlePost__author">Author: {post?.author}</div>
                        {/* post?.email === user?.useremail */true && (
                            <div className="singlePost__icons">
                                <i className="fa-regular fa-pen-to-square" style={{ color: "purple" }} onClick={() => setUpdateMode(true)} ></i>
                                <i className="fa-regular fa-trash-can" style={{ color: "red", marginLeft: '20px' }} onClick={handleDelete}></i>
                            </div>
                        )}
                    </div>

                    {updateMode && <button className="singlePost__updateBtn" /* onClick={handleUpdate} */>Save changes</button>}

                </div>
            </div>
        </div>
    )
};
export default SinglePost;



