import { useEffect, useState } from "react";
import './home.css';
import Menu from "../../components/menu/Menu";

const Home = () => {

    const [data, setData] = useState();
    useEffect(() => {
/* fetch('http://localhost:8001/') */
fetch('https://zany-jade-chipmunk-cape.cyclic.app/')
.then(res => console.log(res));
    }, []);

    return (
        <div>
            <div className="slider">
                <img className="slider__img" src="https://trello.com/1/cards/641ff5e05b2f810f24bdc8bb/attachments/641ff5f7d9d0664367535f3c/previews/641ff5f8d9d0664367536607/download/novogodnie-oboi-2018-2-1.jpg" alt="" />
            </div>
        </div>
    )
}
export default Home;