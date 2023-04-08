import './home.css';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Post from '../../components/post/Post';
import { Context } from '../../context/Context';
import axios from 'axios';

const Home = () => {
const {user} = useContext(Context);
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        console.log('posts useEffect');
        /* fetch('http://localhost:8001/posts') */
        fetch('https://zany-jade-chipmunk-cape.cyclic.app/posts')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((posts) => {
                console.log(posts);
                 setPosts(posts);
            })
            .catch((er) => {
                console.log('error', er);
                navigate('/error');
            });
    }, [])


    const PREVIOUSdelPost = (event) => {
        alert('inside');
        let id = event.target.getAttribute('data-id');
        fetch(`http://localhost:8001/posts/${id}`, {
       /*  fetch(`https://zany-jade-chipmunk-cape.cyclic.app/posts/${id}`, { */
            method: 'DELETE',
           /*  headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'DELETE,'
            }, */
           /*  mode: 'cors', */
        }).then(() => {
            const updatedPosts = posts.filter(post => post._id !== id);
            setPosts(updatedPosts);
           /*  window.location.reload(); */
        });
    };

    const delPost = async (e) => {
        let id = e.target.getAttribute('data-id');
        try {
            await axios.delete(`http://localhost:8001/posts/${id}`);
            const updatedPosts = posts.filter(post => post._id !== id);
            setPosts(updatedPosts);
    
        } catch (err) {
            console.error(err);
        }
    }

  
    return (
        <div>
            {/* <div className="slider">
                <img className="slider__img" src="https://trello.com/1/cards/641ff5e05b2f810f24bdc8bb/attachments/641ff5f7d9d0664367535f3c/previews/641ff5f8d9d0664367536607/download/novogodnie-oboi-2018-2-1.jpg" alt="" />
            </div> */}
            <div>
            <h1 className='posts__header'>Posts:</h1>
            <ul>{
                posts?.map(post => (
                    <Post post={post} delPost={delPost}  key={post._id}/>
                   /*  <li key={post._id}>
                        <article >
                            <h2>
                               <a href="/posts/1">{post.title}</a>
                            </h2>
                            <p>{post.text}</p>
                            <div className='info'>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                <Link to={{ pathname: '/editpost', search: `?id=${post._id}` }} data-id={post._id}>edit</Link>
                                <button data-id={post._id} onClick={(e) => {delPost(e)}}>delete</button>
                                <span>Author: {post.author}</span>
                            </div>
                        </article>
                    </li> */
                ))}
            </ul>
        </div>
        </div>
    )
}
export default Home;