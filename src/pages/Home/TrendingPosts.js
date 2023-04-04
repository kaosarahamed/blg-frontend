import { Link } from "react-router-dom";
import Style from "./css/Trending.module.css";
function TrendingPosts({post}) {

  return (
    <div className={Style.tendingPosts}>
              <div className={Style.postHeader}>
                <p>Popular Posts</p>
                <h3>Trending Posts</h3>
              </div>
              <div className={Style.trendingposts}>
                {post.map((item, index) => (
                <Link to={`/blogs/${item._id}`} state={{item}} key={index}>
                <div className={Style.trendingPost}>
                  <div className={Style.trendingthamnails}>
                    <img src={item.postbanner && "https://blog-app-fjqe.onrender.com"+item.postbanner.replace("public", "")} alt="" />
                  </div>
                  <div className={Style.trendingpostContent}>
                    <h2>{item.title}</h2>
                  </div>
                </div>
                </Link>
                ))}
              </div>
            </div>
  )
}

export default TrendingPosts;