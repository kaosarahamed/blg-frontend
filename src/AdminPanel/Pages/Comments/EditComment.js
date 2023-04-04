import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';
import Style from './css/EditComment.module.css';

function EditComment() {

const [userPic, setUserPic] = useState(null);
const [userComment, setUserComment] = useState({
    username : "",
    comment : ""
});
const {username, comment} = userComment;
const [loading, setLoading] = useState(false);
const [response, setResponse] = useState("");
const location = useLocation();
const id = location.state._id;
const fileRef = useRef();
const [notify, setNotify] = useState(false);
const handleChange = (e) => {
    setUserComment({...userComment, [e.target.name] : e.target.value})
}


const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  const formData = new FormData();
  formData.append("username", username);
  formData.append("comment", comment);
  formData.append("userPic", userPic)
  await axios.patch(`https://blog-app-fjqe.onrender.com/comment/${id}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      }})
            .then((res) => {
              setResponse(res.data.message);
              setLoading(false)
              getComment(id)
            }).catch((err) => {
              setResponse(err.response.data.message);
              setLoading(false)
              getComment(id)
            });
            setUserComment({
              title : "",
              description : "",
            });
            fileRef.current.value = ""
    
  }


  const getComment = async (id) => {
    await axios.get(`https://blog-app-fjqe.onrender.com/comment/single/${id}`)
    .then((res) => {
        setUserComment(res.data);
    }).catch((err) => {
        setResponse(err.response.data.message)
    })
  }

  useEffect(() => {
    getComment(id)
  },[id])

  return (
    <div className={Style.editComment}>
      <div className={Style.editCommentForm}>
      {response && <div className={`${Style.notification} ${
        notify && `${Style.active}`}`}>
          <h3>{response && response }</h3>
          <RxCross2 onClick={() => {setNotify(true)}}/>
          </div>}
        <form onSubmit={handleSubmit}>
            <span>
                <label htmlFor="">Username</label>
                <input type="text" name="username" id="username" onChange={(e) => handleChange(e)} placeholder='username' value={username || ""} required/>
            </span>
            <span>
                <label htmlFor="">Comment</label>
                <textarea name="comment" id="comment" cols="30" rows="10" onChange={(e) => handleChange(e)} placeholder='comment' value={comment || ""}  required></textarea>
            </span>
            <span>
                <label htmlFor="userpic">User Profile Picture</label>
                <input type="file" name="userPic" id="userPic" onChange={(e) => setUserPic(e.target.files[0])} ref={fileRef} required/>
            </span>
            <button>{loading ? "Loading..." : "Edit Comment"}</button>
        </form>
      </div>
    </div>
  )
}

export default EditComment