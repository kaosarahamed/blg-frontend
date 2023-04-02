import { FaAngleRight, FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Style from "./css/GridPosts.module.css";

function GridPosts({post}) {

  const {adminData} = useFetch("http://localhost:4000/admin");

const authorLogo = adminData.map((item) => item.adminPic);
const adminname = adminData.map((item) => item.adminname);
  
  return (
   
    post.map((item) => {
      return(
        <Link to={`/blogs/${item._id}`} state={{item}} key={item._id} className={Style.GridPost}>
        <div className={Style.post}>
                <div className={Style.thamnails}>
                  <img
                    src={item.postbanner && "http://localhost:4000"+item.postbanner.replace("public", "")}
                    alt=""
                  />
                </div>
                <div className={Style.postContent}>
                  <div className={Style.postCategory}>
                    {item.categories.map((cate, index) => (
                      <h3 key={index}>{cate}</h3>
                    ))}                   
                  </div>
                  <h2>{item.title}</h2>
                  <div className={Style.postAdminBar}>
                    <img
                      src={authorLogo[0] && "http://localhost:4000"+authorLogo[0].replace("public", "")}
                      alt=""
                    />
                    <span>
                      <h4>{adminname}</h4>
                      <p>{new Date(item.createdAt).toDateString()}</p>
                    </span>
                  </div>
                  <p>
                   {item.description}
                  </p>
                  <div className={Style.postActionTab}>
                    <span>
                        <h4>Contineu Reading</h4>
                      <FaAngleRight />
                    </span>
                    <span>
                      <FaRegClock />
                      <h4>{Math.ceil(item.description.length / 1000)} Min</h4>
                    </span>
                  </div>
                </div>
    </div>
        </Link>
      )
    })
    
  )
}

export default GridPosts;