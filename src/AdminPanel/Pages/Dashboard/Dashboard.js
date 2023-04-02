import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from './css/Dashboard.module.css';
function Dashboard() {

const [post, setPost] = useState([]);
const [error, setError] = useState('');
const [comment, setComment] = useState([]);

useEffect(() => {
  axios.get("http://localhost:4000/post/")
  .then((res) => {
    setPost(res.data)
  }).catch(err => setError(err.response.data.message));


  axios.get("http://localhost:4000/comment/")
  .then((res) => {
    setComment(res.data)
  }).catch((err) => {
    setError(err.response.data.message)
  });


},[])


const slicePost = post.slice(0, 8);
const sliceComment = comment.slice(0, 5);

  return (
    <div className={Style.dashboard}>
      {error && <p>{error}</p> }
                <div className={Style.tabone}>
                  <div className={Style.postTab}>
                    <h5>Latest Posts</h5>
                    <div className={Style.editorPostsList}>             
                {slicePost.map((item, index) => {
                  const {_id} = item
                  return(
                          <Link to={`/posts/${_id}`} key={index} state={{item, _id}}>
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
                  </div>
                  <div className={Style.commenTab}>
                    <h5>Commments</h5>
                    <div className={Style.commentList}>
                      {sliceComment.map((item, index) => {
                        const {username, comment, date, userPic, _id} = item;
                        return (
                          <Link to={`/comment/${_id}`} key={index} state={{_id}}>
                          <div className={Style.commentItem} >
                          <div className={Style.commentHead}>
                            <img src={userPic && "http://localhost:4000"+userPic.replace("public", "")} alt="" />
                            <span>
                            <h2>{username}</h2>
                          <h3>{new Date(date).toDateString()}</h3>
                            </span>
                          </div>
                          <p>
                            {comment}
                          </p>
                        </div>
                          </Link>
                        )
                      })}
                      
                    </div>
                  </div>
                </div>
            </div>
  )
}

export default Dashboard;