import { useEffect, useState } from "react";
import Menu from "../components/Menu";

const Home = () => {

    const [data, setData] = useState();
    useEffect(() => {
/* fetch('http://localhost:8001/') */
fetch('https://zany-jade-chipmunk-cape.cyclic.app/')
.then(res => console.log(res));
    }, []);

    return (
        <div>
            <h1>HomePage</h1>
        </div>
    )
}
export default Home;