
import './App.css';
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


const Layout = () => {


  return (
    <>
      <Menu />
      <Outlet />
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
export default App;
