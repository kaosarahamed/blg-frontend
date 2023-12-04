import axios from "axios";
import { useEffect, useState } from "react";
import Style from "./css/CommentForm.module.css";

const intialValues = {
  username: "",
  comment: "",
  userPic: "",
  postId: "",
  date: new Date(),
};

function CommentForm({ data }) {
  const [comment, setComment] = useState(intialValues);
  const [response, setResponse] = useState("");
  const [comData, setcomData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://tanvirblog007-71b473c5e0c8.herokuapp.com/comment", comment)
      .then((res) => {
        setResponse(res.data.message);
        getAllComment(data);
        setComment({
          comment: "",
        });
      })
      .catch((err) => setResponse(err.response.data.message));
  };

  const getAllComment = async (data) => {
    await axios
      .get(
        `https://tanvirblog007-71b473c5e0c8.herokuapp.com/comment/${data._id}`
      )
      .then((res) => {
        setcomData(res.data);
      })
      .catch((err) => {
        setResponse(err.response.data.message);
      });
  };

  useEffect(() => {
    getAllComment(data);
  }, [data]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      username: localStorage.getItem("username"),
      comment: e.target.value,
      userPic: localStorage.getItem("userlogo"),
      postId: data._id,
    });
  };
  return (
    <div className={Style.commentWrapper}>
      <h2>{response}</h2>
      <div className={Style.commentContainer}>
        {comData &&
          comData.map((item, index) => {
            const { username, comment, date, userPic } = item;
            return (
              <div className={Style.commentList} key={index}>
                <img
                  src={
                    userPic &&
                    "https://tanvirblog007-71b473c5e0c8.herokuapp.com" +
                      userPic.replace("public", "")
                  }
                  alt=""
                />
                <span>
                  <h2>{username}</h2>
                  <h4>{new Date(date).toDateString()}</h4>
                  <p>{comment}</p>
                </span>
              </div>
            );
          })}
        <div className={Style.commentForm}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="comment">Add your comment</label>
            <textarea
              name="comment"
              id=""
              cols="30"
              rows="10"
              value={comment.comment}
              placeholder="Enter your comment"
              onChange={(e) => handleChange(e)}
            ></textarea>
            <button type="submit">Add Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
