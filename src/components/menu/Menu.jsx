import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './menu.css';

const Menu = () => {
    const {user} = useContext(Context);
    return (
        <div className="header" >
            <nav className="menu">
                <h1 className="menu__header">Just Blog</h1>
                <ul className="menu__list">
                    <li className="menu__item"><Link to="/">Home</Link></li>
                    <li className="menu__item"><Link to="/posts">Posts</Link></li>
                    <li className="menu__item"><Link to="/newpost">New Post</Link></li>
                </ul>
                {user ? (
                    <ul className="menu__list">
                        <li className="menu__item menu__item_logout"><a href="/logout">Logout</a></li>
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