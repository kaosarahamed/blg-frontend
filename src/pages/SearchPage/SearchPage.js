import { useLocation } from "react-router-dom";
import GridPosts from "../../components/GridPosts/GridPosts";
import Style from "../Blogs/css/Blog.module.css";
import Banner from "./SearchBanner";



function SearchPage() {

const location = useLocation();

const post = location.state.filterData;
const search = location.state.search;


  return (
    <div className={Style.blog}>
    <Banner search={search}/>
    <div className={Style.blogPage}>
    {post.length !== 0 ? <GridPosts post={post} /> : <h1>Nothing found, search again</h1> }
    </div>
    </div>
  )
}

export default SearchPage