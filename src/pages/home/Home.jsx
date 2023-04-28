import './home.css';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Post from '../../components/post/Post';
import { Context } from '../../context/Context';
import axios from 'axios';
import { LoadingSpinner } from '../../loadingSpinner/LoadingSpinner';



const Home = () => {
    const { user } = useContext(Context);
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
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
                setLoading(false);
            })
            .catch((er) => {
                console.log('error', er);
                navigate('/error');
            });
    }, [])


    const PREVIOUSdelPost = (event) => {
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

    const delPost = async (postId) => {
        setLoading(true);
        /*  let id = e.target.getAttribute('data-id'); */
        let id = postId;
        try {
            /*  await axios.delete(`http://localhost:8001/posts/${id}`); */
            await axios.delete(`https://zany-jade-chipmunk-cape.cyclic.app/posts/${id}`);
            /* const updatedPosts = posts.filter(post => post._id !== id);
             setPosts(updatedPosts); */
            /* const response = await axios.get('http://localhost:8001/posts'); */
            const response = await axios.get('https://zany-jade-chipmunk-cape.cyclic.app/posts');
            setPosts(response.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className='home'>

            <div>
                <h1 className='home__header'>Posts:</h1>
                {loading ? (<LoadingSpinner />) : (<ul>{
                    posts?.map(post => (
                        <Post post={post} delPost={delPost} key={post._id} />
                    ))}
                </ul>)}

            </div>
        </div>
    )
}
export default Home;