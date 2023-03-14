import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const authorRef = useRef(null);
    const textRef = useRef(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        console.log('work');

    }, []);
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
                author: authorRef.current.value,
                text: textRef.current.value,
            })
        })
            .then(response => {
                console.log('tyt');
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
                navigate('/posts');
            })
            .catch(error => console.error(error));

    };

    return (
        <div>
            <h1>NewPost</h1>
            <form id="contact-form" method="post">
                <div className="form-info">
                    <label>Post Title
                        <input type="text" name="title" ref={titleRef}></input>
                    </label>
                    <label>Author
                        <input type="text" name="author" ref={authorRef}></input>
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