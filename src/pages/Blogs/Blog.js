import axios from "axios";
import React, { useEffect, useState } from "react";
import GridPost from "../../components/GridPosts/GridPosts";
import Banner from "./Banner";
import Style from "./css/Blog.module.css";

function Blog() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const [loadMore, setLoadMore] = useState(6);

  useEffect(() => {
    axios
      .get("https://tanvirblog007-71b473c5e0c8.herokuapp.com/post/")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  const slicePost = post.slice(0, loadMore);
  const loadMorePost = () => {
    setLoadMore(loadMore + 3);
  };

  return (
    <div className={Style.blog}>
      <Banner />
      <div className={Style.blogPage}>
        <GridPost post={slicePost} error={error} />
      </div>
      <button onClick={loadMorePost}>Load More</button>
    </div>
  );
}

export default Blog;
