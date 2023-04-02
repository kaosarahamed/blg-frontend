import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";
import Style from "./css/SinglePost.module.css";
import PostWrapper from "./PostWrapper";

function SinglePost() {
const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  },[token, navigate])

  const location = useLocation();
  const data = location.state.item;

  return (
    <div className={Style.singlePost}>
      <div className={Style.singlePostContainer}>
        <div className={Style.singlePostWrapper}>
          <PostWrapper data={data}/>
          <CommentForm data={data}/>
        </div>
      </div>
    </div>
  )
}

export default SinglePost