import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Style from "../css/userdashboard.module.css";

function Setting() {
const id = localStorage.getItem("id");
const [user, setUser] = useState({
  username : "",
  email : "",
  password : "",
  ConfirmPassword : "",
});
const {username, email, password, confirmpassword} = user;
const [userlogo, setUserLogo] = useState(null);
const [notify, setNotify] = useState(false);
const [loading, setLoading] = useState(false)
const fileRef = useRef();
const [response, setResponse] = useState("");
const [error, setError] =useState("");
const formData = new FormData();
formData.append("username", username);
formData.append("email", email);
formData.append("password", password);
formData.append("confirmpassword", confirmpassword);
formData.append("userlogo", userlogo)
const handleSubmit = async (e) => {
  setLoading(true);
e.preventDefault();
if(password.length < 8){
  setResponse("Password should minimum 8 character")
  setLoading(false)
}else if(password !== confirmpassword){
  setResponse("Password does not match")
  setLoading(false)
}else{
  await axios.patch(`https://blog-app-fjqe.onrender.com/user/${id}`, formData, {
  headers: {
    'content-type': 'multipart/form-data',
  }})
        .then((res) => {
          setResponse(res.data.message);
          setLoading(false)
        }).catch((err) => {
          setResponse(err.response.data.message);
          setLoading(false)
        });
        setUser({
          username : "",
          email : "",
          password : "",
          confirmpassword : ""
        });
        fileRef.current.value = "";
        getuser(id)
}

}

const handleChange = (e) => {
  setUser({...user, [e.target.name] : e.target.value})
}
const getuser = async (id) => {
  await axios.get(`https://blog-app-fjqe.onrender.com/user/${id}`)
  .then((res) => {
    setUser(res.data);
    localStorage.setItem("userlogo", res.data.userlogo);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("email", res.data.email);
  }).catch((err) => {
    setError(err)
  })
}


useEffect(() => {
  getuser(id)
},[id])





  return (
    <div className={Style.settingpage}>
      {response && <div className={`${Style.notification} ${
        notify && `${Style.active}`}`}>
          <h3>{response ? response : error}</h3>
          <RxCross2 onClick={() => {setNotify(true)}}/>
          </div>}
            <p>Profile Setting</p>
            <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="username">Your username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username || "" }
                onChange={(e) => handleChange(e)}
                placeholder="Enter your username"
                required
              />
            </span>
            <span>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email || ""}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your email"
                required
              />
            </span>
            <span>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password || ""}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your password"
                required
              />
            </span>
            <span>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={confirmpassword || ""}
                onChange={(e) => handleChange(e)}
                placeholder="Confirm password"
                required
              />
            </span>
            <span>
              <label htmlFor="userlogo">User Logo</label>
              <input 
              type="file" 
              name="userlogo" 
              id="userlogo"
              ref={fileRef}
              onChange={(e) => setUserLogo(e.target.files[0])} 
              placeholder="Add your logo"
              required
              />
            </span>
            <button type="submit">{loading ? "Loading..." : "Save Changes"}</button>
          </form>
          </div>
  )
}

export default Setting