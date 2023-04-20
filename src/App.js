import './App.css';
import './styles.css';
import { lazy, Suspense, useContext } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import { Context } from './context/Context';

/* const Home = lazy(() => import('./pages/home/Home'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const NewPost = lazy(() => import('./pages/NewPost'));
const Posts = lazy(() => import('./pages/Posts'));
const Post = lazy(() => import('./pages/Post'));
const Error = lazy(() => import('./pages/Error'));
const Menu = lazy(() => import('./components/menu/Menu'));
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register')); */


import Home from './pages/home/Home.jsx';
import NewPost from './pages/newPost/NewPost';
import Error from './pages/Error';
import Menu from './components/menu/Menu';
import EditPost from './pages/EditPost';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Post from './components/post/Post';
import SinglePost from './pages/singlePost/SinglePost';


const Layout = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};

function App() {
 

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index /* path="/" */ element={<Home />} />
            <Route path="register" element={/* user ? <Home /> :  */<Register />} />
            <Route path="login" element={/* user ? <Home /> :  */<Login />} />
            <Route path="newpost" element={<NewPost />} />
            <Route path="editpost" element={<EditPost />} />
            <Route path="profile" element={/* user ?  */<Profile />/*  : <Home /> */} />
           {/*  <Route path="posts" element={<Posts />} /> */}
            <Route path="error" element={<Error />} />
            <Route path="post/:postId" element={<SinglePost />} />
            {/*   <Route path="post/:postId" element={<Single />} /> */}
          </Route>
        </Routes>
   </Suspense>
  );
}

export default App;

























/* import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from './pages/home/Home.jsx';
import NewPost from './pages/NewPost';
import Posts from './pages/Posts';
import Error from './pages/Error';
import Menu from './components/menu/Menu';
import Post from './pages/Post';
import './styles.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';


const Layout = () => {

const user = true;
  return (
    <>
      <Menu />
      <Outlet />
      {user ? <Profile /> : <Posts />}
    </>
  )
};



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/newpost",
        element: <NewPost />,
      },
      {
        path: "/editpost",
        element: <Post />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/error",
        element: <Error />,
      },
    ],
  },
]);
function App() {


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export { router };
export default App; */
