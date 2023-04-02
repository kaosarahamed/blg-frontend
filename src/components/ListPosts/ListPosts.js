
import { Link } from "react-router-dom";
import Style from "./css/ListPosts.module.css";

function ListPosts({post}) {





  return (
    <div className={Style.editorPostsList}>
      
        {post.map((item, index) => {
          return(
            <Link to={`/blogs/${item._id}`} key={index} state={{item}}>
            <div className={Style.editorPosts} >
                <div className={Style.postThamnail}>
                  <img
                    src={item.postbanner && "http://localhost:4000"+item.postbanner.replace("public", "")}
                    alt=""
                  />
                </div>
                <div className={Style.editorpostContent}>
                  <h2>{item.title}</h2>
                  <div className={Style.postfooter}>
                    <p>Kaosar Ahamed</p>
                    <p>{new Date(item.createdAt).toDateString()}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}  
    </div>
  )
}

export default ListPosts;