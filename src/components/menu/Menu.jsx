import './menu.css';

const Menu = () => {
    return (
        <div className="header" >
            <nav className="menu">
                <h1 className="menu__header">Just Blog</h1>
                <ul className="menu__list">
                    <li className="menu__item"><a href="/">Home</a></li>
                    <li className="menu__item"><a href="/posts">Posts</a></li>
                    <li className="menu__item"><a href="/newpost">New Post</a></li>
                </ul>
                <ul className="menu__list">
                    <li className="menu__item"><a href="/login">Login</a></li>
                    <li className="menu__item"><a href="/register">Register</a></li>
                </ul>
            </nav>
        </div>
    )
}
export default Menu;