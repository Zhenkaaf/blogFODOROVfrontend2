
import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from './pages/Home.jsx';
import NewPost from './pages/NewPost';
import Posts from './pages/Posts';
import Error from './pages/Error';
import Menu from './components/Menu';
import Post from './pages/Post';
import './styles.css';

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
