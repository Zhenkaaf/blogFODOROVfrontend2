import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../../context/Context";
import './newpost.css';
import axios from "axios";
import { uploadFileToFirebase } from "../../uploadToFirebase/uploadFileToFirebase";


const NewPost = () => {
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const [file, setFile] = useState(null);
    const [isValidTitle, setValidTitle] = useState(false);
    const [isValidText, setValidText] = useState(false);
    const { user } = useContext(Context);
    console.log('user', user);


    const uploadPost = async (post) => {
        try {
            const response = await axios.post('https://zany-jade-chipmunk-cape.cyclic.app/posts/newpost', post, {
                /* const response = await axios.post('http://localhost:8001/posts/newpost', post, { */
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
            });
            console.log(response.data);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };



    const checkData = () => {
        let isValidData = true;

        if (!titleRef?.current.value.trim()) {
            setValidTitle(true);
            isValidData = false;
        }
        if (!textRef?.current.value.trim()) {
            setValidText(true);
            isValidData = false;
        }
       
        return isValidData;
        
    };


    const sendData = async (event) => {
        event.preventDefault();
        if (!checkData()) {
            return;
        }

        if (file) {
            try {
                let downloadURL = await uploadFileToFirebase(file, 'blogPhotos');
                const post = {
                    title: titleRef.current.value,
                    author: user.userName,
                    text: textRef.current.value,
                    email: user.userEmail,
                    picture: downloadURL,
                };
                await uploadPost(post);
            } catch (err) {
                console.error(err);
            }
        } else {
            const post = {
                title: titleRef.current.value,
                author: user.userName,
                text: textRef.current.value,
                email: user.userEmail,
            };
            try {
                await uploadPost(post);
            } catch (err) {
                console.error(err);
            }
        }
    };




    return (
        <div className="newPost">
            <div className="newPost__wrapper">
                <h1 className="newPost__header">Write your own post!</h1>
                <form id="newPost__form" method="post">

                    {isValidTitle && <span className="newPost__warning">*required field</span>}
                    <input type='text' /* defaultValue={title} */ autoFocus className="newPost__title" ref={titleRef} placeholder='Title' onChange={() => setValidTitle(false)} />

                    {isValidText && <span className="newPost__warning">*required field</span>}
                    <textarea name="text" className="newPost__text" ref={textRef} placeholder='Write your story' onChange={() => setValidText(false)}></textarea>

                    <label htmlFor="newPost__fileInput">Choose photo:
                        <i className="newPost__icon fa-regular fa-image"></i>
                    </label>
                    <input type="file" id='newPost__fileInput' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />

                    <div className="newPost__form-block">
                        <button className="newPost__btn" type="submit" onClick={(e) => sendData(e)} >Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default NewPost;




/* const a = (event) => {
    event.preventDefault();
    fetch('http://localhost:8001/newpost', {
         //fetch('https://zany-jade-chipmunk-cape.cyclic.app/newpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,'
        },
         mode: 'cors',
        body: JSON.stringify({
            title: titleRef.current.value,
            author: user.userName,
            text: textRef.current.value,
            email: user.userEmail,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.text();
        })
        .then(response => {
            console.log(typeof response);
            return JSON.parse(response)
        })
        .then(data => {
            console.log(data);
            navigate('/');
        })
        .catch(error => console.error(error));
}; */








/* const sendData = (event) => {
        event.preventDefault();
        if (file) {
            const filename = `${Date.now()}${file.name}`;
            const blogPhotoRef = ref(storage, `blogPhotos/${filename}`);
            const uploadTask = uploadBytesResumable(blogPhotoRef, file);
            
            uploadTask.on(

                (error) => {
                    console.error(error);
                },
                async () => {
                    console.log('tyt');
                    try {
                        let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);



                        const post = {
                            title: titleRef.current.value,
                            author: user.userName,
                            text: textRef.current.value,
                            email: user.userEmail,
                            picture: downloadURL,
                        };

                        uploadPost(post);


                    } catch (err) {
                        console.error(err);
                    }
                }
            );
        } else {
            const post = {
                title: titleRef.current.value,
                author: user.userName,
                text: textRef.current.value,
                email: user.userEmail,
            };

            uploadPost(post);
        }
    }; */