import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../../context/Context";
import './newpost.css';

const NewPost = () => {
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const {user} = useContext(Context);
    console.log('user', user);

    const sendData = (event) => {
        event.preventDefault();
        /*  fetch('http://localhost:8001/newpost', { */
        fetch('https://zany-jade-chipmunk-cape.cyclic.app/newpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,'
            },
           /*  mode: 'cors', */
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
            /* .then(response => {
                console.log(typeof response);
                return JSON.parse(response)
            }) */
            .then(data => {
                console.log(data);
                navigate('/');
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="new">
            <h1>NewPost</h1>
            <form id="contact-form" method="post">
                <div className="form-info">
                    <label>Post Title
                        <input type="text" name="title" ref={titleRef}></input>
                    </label>
                </div>
                <div className="form-text">
                    <label>Post Text
                        <textarea name="text" ref={textRef}></textarea>
                    </label>
                </div>
                <div className="form-button">
                    <input type="submit" value="Submit" onClick={(e) => sendData(e)}></input>
                </div>
            </form>
        </div>
    )
}
export default NewPost;