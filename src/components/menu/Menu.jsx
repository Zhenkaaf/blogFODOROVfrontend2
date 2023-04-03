import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../../context/Actions';
import { Context } from '../../context/Context';
import SinglePost from '../post/Post';
import './menu.css';


const Menu = () => {
    const { user, dispatch } = useContext(Context);
const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(Logout());
        navigate('/');
      
    };

    return (
        <div className="header" >
            <nav className="menu">
                <Link to="/"><h1 className="menu__header">Just Blog</h1></Link>
                <ul className="menu__list">
                     <li className="menu__item"><Link to="/singlepost">SinglePost</Link></li>
                    {/*  <li className="menu__item"><Link to="/posts">Posts</Link></li> */}
                    {user && (<li className="menu__item"><Link to="/newpost">New Post</Link></li>)}

                </ul>
                {user ? (
                    <ul className="menu__list">
                        <li className="menu__item menu__item_logout" onClick={handleLogout}>Logout</li>
                        <li className="menu__item"><Link to="/profile"><img className="menu__profileImg" src='https://aif-s3.aif.ru/images/019/507/eeba36a2a2d37754bab8b462f4262d97.jpg'/* {PF + user.profilePic} */ alt="" /></Link></li>
                    </ul>
                )
                    :
                    (<ul className="menu__list">
                        <li className="menu__item"><Link to="/login">Login</Link></li>
                        <li className="menu__item"><Link to="/register">Register</Link></li>
                    </ul>)}
            </nav>
        </div>
    )
}
export default Menu;