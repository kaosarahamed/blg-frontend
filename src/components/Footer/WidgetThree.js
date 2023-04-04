import axios from "axios";
import React, { useEffect, useState } from 'react';
import ListPosts from "../../components/ListPosts/ListPosts";
import Style from "./css/WidgetThree.module.css";
function WidgetThree() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
    axios.get("https://blog-app-fjqe.onrender.com/post/")
    .then((res) => {
      setPost(res.data)
    }).catch((err) => {
      setError(err.response.data.message)
    })
  },[])

  const slicePost = post.slice(0, 3)
  return (
    <div className={Style.widgetThree}>
            <div className={Style.postHeader}>
              <p>Popular Posts</p>
              <h3>Trending Posts</h3>
            </div>
            <ListPosts post={slicePost} error={error}/>
          </div>
  )
}

export default WidgetThree;