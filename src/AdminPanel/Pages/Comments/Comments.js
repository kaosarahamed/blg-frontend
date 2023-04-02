import axios from "axios";
import { useEffect, useState } from "react";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import Style from './css/Comments.module.css';



function Comments() {

  const [comment, setComment] = useState([]);
  const [error, setError] = useState('');
  const [response, setResponse] = useState("")
  const [notify, setNotify] = useState(false);
const getAllComment = async () => {
  await axios.get("http://localhost:4000/comment/")
  .then((res) => {
    setComment(res.data)
  }).catch((err) => {
    setError(err.response.data.message)
  });
}


useEffect(() => {
 
  getAllComment()

},[])


const deletePost = async (id) => {
  await axios.delete(`http://localhost:4000/comment/delete/${id}`)
  .then((res) => {
    setResponse(res.data.message);
    getAllComment()
  }).catch((err) => {
    setResponse(err.response.data.message);
    getAllComment()
  });
  
}












  return (
    <div className={Style.dashComment}>
      {response && <div className={`${Style.notification} ${
        notify && `${Style.active}`}`}>
          <h3>{response ? response : error}</h3>
          <RxCross2 onClick={() => {setNotify(true)}}/>
          </div>}
              <div className={Style.dashcomContainer}>
                <div className={Style.commentHeader}>
                  <p>Username</p>
                  <p>User Picture</p>
                  <p>Comment</p>
                  <p>Actions</p>
                </div>
                <div className={Style.commentLists}>
                {comment.map((item, index) => {
                  const {username, comment, userPic, date, _id} = item;
                  return(<div className={Style.commentsItem} key={index}>
                    <div className={Style.commentHead}>
                    <h2>{username}</h2>
                    <h3>{new Date(date).toDateString()}</h3>
                    </div>
                    <img
                        src={userPic && "http://localhost:4000"+userPic.replace("public", "")}
                        alt=""
                      />
                    <p>
                      {comment}
                    </p>
                    <span>
                    <Link to={`/comment/${_id}`} state={{_id}}>
                          <FaPenSquare />
                      </Link>
                      <Link onClick={() => deletePost(item._id)}>
                          <FaTrashAlt />
                      </Link>
                    </span>
                  </div>)
                })}
                </div>
              </div>
            </div>
  )
}

export default Comments;