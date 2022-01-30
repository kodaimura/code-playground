import {Link} from "react-router-dom";

import Header from '../parts/Header';


const IndexPage = () => {

	return (
		<>
		<Header />
		<Link to={"/guest"}>
            ゲストページ
        </Link>
		</>
	)
	
}

export default IndexPage;