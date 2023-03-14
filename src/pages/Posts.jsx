import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    console.log('useStateData', data);
    useEffect(() => {
        console.log('posts useEffect');
        /* fetch('http://localhost:8001/posts') */
        fetch('https://zany-jade-chipmunk-cape.cyclic.app/posts')
            .then((response) => {
                console.log(typeof response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
               
                console.log(data);
                 setData(data);
            })
            .catch((er) => {
                console.log('error', er);
                navigate('/error');
            });
    }, [])


    const delPost = (event) => {
        let id = event.target.getAttribute('data-id');
        /* fetch(`http://localhost:8001/posts/${id}`, { */
        fetch(`https://zany-jade-chipmunk-cape.cyclic.app/posts/${id}`, {
            method: 'DELETE',
           /*  headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'DELETE,'
            }, */
           /*  mode: 'cors', */
        }).then(() => {
            window.location.reload();
        });
    };


    return (
        <div>
            <h1>Posts:</h1>
            <ul>{
                data?.map(post => (
                    <li key={post._id}>
                        <article >
                            <h2>
                               {/*  <a href="/posts/1"> */}{post.title}{/* </a> */}
                            </h2>
                            <p>{post.text}</p>
                            <div className='info'>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                <Link to={{ pathname: '/editpost', search: `?id=${post._id}` }} data-id={post._id}>edit</Link>
                                <button data-id={post._id} onClick={(e) => {delPost(e)}}>delete</button>
                                <span>Author: {post.author}</span>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Posts;