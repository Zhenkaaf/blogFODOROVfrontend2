import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const Post = () => {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const authorRef = useRef(null);
    const textRef = useRef(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');


    console.log('useStateData', post);
    useEffect(() => {
        console.log('edit useEffect');
        /* fetch(`http://localhost:8001/edit/${id}`) */
        fetch(`https://zany-jade-chipmunk-cape.cyclic.app/edit/${id}`)
            .then((response) => {
                console.log(typeof response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {

                console.log(data);
                setPost(data);
            })
            .catch((er) => {
                console.log('error', er);
                navigate('/error');
            });
    }, [])




    const updateData = (event) => {
        event.preventDefault();
        let id = event.target.getAttribute('data-id');
       /*  fetch(`http://localhost:8001/editpost/${id}`, { */
              fetch(`https://zany-jade-chipmunk-cape.cyclic.app/editpost/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT,'
            },
            body: JSON.stringify({
                title: titleRef.current.value,
                author: authorRef.current.value,
                text: textRef.current.value,
            })
            /*  mode: 'cors', */
        }).then(() => {
            navigate('/posts');
        })
            .catch(error => console.error(error));
    };


    return (
        <div>
            <h1>Post:</h1>
            {post && (<form id="contact-form" method="post" action="/edit/post._id?_method=PUT">
                <div className="form-info">
                    <label>Post Title
                        <input type="text" name="title" ref={titleRef} defaultValue={post.title}></input>
                    </label>
                    <label>Author
                        <input type="text" name="author" ref={authorRef} defaultValue={post.author}></input>
                    </label>
                </div>
                <div className="form-text">
                    <label>Post Text
                        <textarea name="text" ref={textRef} defaultValue={post.text}></textarea>
                    </label>
                </div>
                <div className="form-button">
                    <input data-id={post._id} type="submit" value="Submit" onClick={(e) => updateData(e)}></input>
                </div>
            </form>)}


        </div>
    )
}
export default Post;