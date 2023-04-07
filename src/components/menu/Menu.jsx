import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../../context/Actions';
import { Context } from '../../context/Context';
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
                    {/*  <li className="menu__item"><Link to="/singlepost">SinglePost</Link></li> */}
                    {/*  <li className="menu__item"><Link to="/posts">Posts</Link></li> */}
                    {user && (<li className="menu__item"><Link to="/newpost">New Post</Link></li>)}

                </ul>
                {user ? (
                    <ul className="menu__list">
                        <li className="menu__item menu__item_logout" onClick={handleLogout}>Logout</li>
                        <li className="menu__item"><Link to="/profile"><img className="menu__profileImg" src={user.userPhoto ? user.userPhoto : 'https://photoshablon.com/_ph/44/193521795.jpg'}/* {PF + user.profilePic} */ alt="" /></Link></li>
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