import axios from "axios";
import { useEffect, useState } from "react";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Style from "./css/AdminPosts.module.css";
function AdminPosts() {
  const [post, setPots] = useState([]);
  const [response, setResponse] = useState("");

  const getAllPost = async () => {
    await axios
      .get("https://tanvirblog007-71b473c5e0c8.herokuapp.com/post")
      .then((res) => {
        setPots(res.data);
      })
      .catch((err) => {
        setResponse(err.response.data.message);
      });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const deletePost = async (id) => {
    await axios
      .delete(`https://tanvirblog007-71b473c5e0c8.herokuapp.com/post/${id}`)
      .then((res) => {
        setResponse(res.data.message);
        getAllPost();
      })
      .catch((err) => {
        setResponse(err.response.data.message);
        getAllPost();
      });
  };

  return (
    <div className={Style.dashboardPosts}>
      <div>{response && <h4>{response}</h4>}</div>
      <Link to="/posts/create">
        <button>Create Post</button>
      </Link>
      <div className={Style.dashboardPostsContainer}>
        <div className={Style.dashpostHeader}>
          <p>Title</p>
          <p>Post Banner</p>
          <p>categories</p>
          <p>Content</p>
          <p>Actions</p>
        </div>
        {post.map((item, index) => {
          const { _id } = item;
          return (
            <div className={Style.postsLists} key={index}>
              <div className={Style.title}>
                <h2>{item.title}</h2>
              </div>
              <div className={Style.admin}>
                <img
                  src={
                    item.postbanner &&
                    "https://tanvirblog007-71b473c5e0c8.herokuapp.com" +
                      item.postbanner.replace("public", "")
                  }
                  alt=""
                />
              </div>
              <div className={Style.categories}>
                <ul>
                  {item.categories.map((cate, index) => (
                    <li key={index}>{cate}</li>
                  ))}
                </ul>
              </div>
              <div className={Style.content}>
                <p>{item.description}</p>
              </div>
              <div className={Style.actions}>
                <Link to={`/posts/${_id}`} state={{ _id }}>
                  <FaPenSquare />
                </Link>
                <Link onClick={() => deletePost(item._id)}>
                  <FaTrashAlt />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPosts;
