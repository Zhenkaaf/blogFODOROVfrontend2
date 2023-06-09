import './singlepost.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import { uploadFileToFirebase } from '../../uploadToFirebase/uploadFileToFirebase';
import {LoadingSpinner} from '../../loadingSpinner/LoadingSpinner';
import { Popup } from '../../portal/Popup';

const SinglePost = () => {
    const { user } = useContext(Context);
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const mode = location?.state?.mode || false;
    const pathId = location.pathname.split('/')[2];
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    console.log(post);
    console.log(user);

    /* const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);
    const sid = searchParams.get('_id');
    console.log(sid); */



    useEffect(() => {
        setLoading(true);
        const getPost = async () => {
            try {
                /*  const res = await axios.get(`http://localhost:8001/posts/${path}`); */
                const res = await axios.get(`https://zany-jade-chipmunk-cape.cyclic.app/posts/${pathId}`);
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.text);
                setImageUrl(res.data.picture);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        if (mode) {
            setUpdateMode(mode);
        }
        getPost();

    }, [pathId]);



    const handleDelete = async () => {
        try {
            /*  await axios.delete(`http://localhost:8001/posts/${post._id}`); */
            await axios.delete(`https://zany-jade-chipmunk-cape.cyclic.app/posts/${post._id}`);
            navigate('/profile');

        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async (newData) => {
        try {
            /*  let res = await axios.put(`http://localhost:8001/posts/${post._id}`, newData); */
            let res = await axios.put(`https://zany-jade-chipmunk-cape.cyclic.app/posts/${post._id}`, newData);
            setImageUrl(res.data.picture);
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
        }
    };




    const updatePost = async (event) => {
        if (file) {
            try {
                let downloadURL = await uploadFileToFirebase(file, 'blogPhotos');
                const post = {
                    email: user.userEmail,
                    title,
                    text: desc,
                    picture: downloadURL,
                };
                await handleUpdate(post);
            } catch (err) {
                console.error(err);
            }
        } else {
            const post = {
                email: user.userEmail,
                title,
                text: desc,
            };
            try {
                await handleUpdate(post);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };


    return (
        <div className="singlePost">
            {loading ? (<LoadingSpinner />) : (
                 <div className="singlePost__wrapper">

                 <div className="singlePost__imgBlock">
                     <img className="singlePost__img" src={imageUrl ? imageUrl : 'https://i.postimg.cc/x1wg19Hk/26345obil.jpg'} alt="" />
 
                     {updateMode ? (<div className='singlePost__file-container'>
                         <label htmlFor="singlePost__fileInput">
                             {/*  <i className="newPost__icon fa-regular fa-image"></i> */}
                             <div className='singlePost__chooseFile'>CHOOSE NEW PHOTO !</div>
                         </label>
                         <input type="file" id='singlePost__fileInput' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                     </div>)
                         : (null)}
                 </div>
 
 
                 <div className="singlePost__content">
                     {updateMode
                         ? (<input type='text' defaultValue={title} autoFocus className="singlePost__title-edit-input" onChange={(e) => setTitle(e.target.value)} />)
                         :
                         (<h1 className="singlePost__title">{title}</h1>)
                     }
 
 
 
 
                     {updateMode ? (<textarea className="singlePost__text-edit-textarea" defaultValue={desc} onChange={(e) => setDesc(e.target.value)} />)
                         : (<p className="singlePost__text">{desc}</p>)
                     }
 
                     <div className="singlePost__info">
                         <div className="singlePost__date">{new Date(post?.createdAt).toLocaleDateString()}</div>
                         <div className="singlePost__author">Author: {post?.author}</div>
                         {post?.email === user?.userEmail && (
                            <div>
                                <div>
                                    {isOpen && <Popup isOpen={isOpen} onClose={handleClose} postId={post._id} onDelete={handleDelete} />}
                                </div>
                                <div className="singlePost__icons">
                                 {!updateMode && <i className="singlePost__icon-edit fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)} ></i>}
                                 <i className="singlePost__icon-del fa-regular fa-trash-can" onClick={() => setIsOpen(true)}></i>
                             </div>
                            </div>
                         )}
                     </div>
 
 
                     {updateMode && <div className="singlePost__buttons">
                         <button className="singlePost__updateBtn" onClick={updatePost}>Save changes</button>
                         <button className="singlePost__cancelBtn" onClick={() => setUpdateMode(false)}>Cancel</button>
                     </div>}
 
                 </div>
             </div>
            )}
           
        </div>
    )
};
export default SinglePost;



