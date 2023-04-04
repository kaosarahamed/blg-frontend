import axios from "axios";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Image from "../../Assists/images/beeple3.png";
import Style from "../Register/css/Register.module.css";

function Login() {
  
  const [user, setUser] = useState({
    email : "",
    password : "",
    confirmpassword : "",
  });
  const [response, setResponse] = useState("");
  const {email, password, confirmpassword} = user;
  const [notify, setNotify] = useState(false);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
  
   if(password !== confirmpassword){
      setResponse("Password does not match")
      setLoading(false)
    }else{
      await axios.post("https://blog-app-fjqe.onrender.com/user/login", user)
            .then((res) => {
              setResponse(res.data.message);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userlogo", res.data.user.userlogo);
              localStorage.setItem("id", res.data.user._id);
              localStorage.setItem("username", res.data.user.username);
              localStorage.setItem("email", res.data.user.email);
              setLoading(false)
              setTimeout(() => {
                navigate("/")
              }, 3000);
            }).catch((err) => {
              setResponse(err.response.data.message);
              setLoading(false)
            });
            setUser({
              email : "",
              password : "",
              confirmpassword : ""
            });
    } 
  }




  return (
    <div className={Style.contactUsSection}>
      <div className={Style.contactUsContainer}>
        <div className={Style.banner}>
          <img src={Image} alt="" />
        </div>
        <div className={Style.contactForm}>
        {response && <div className={`${Style.notification} ${
        notify && `${Style.active}`}`}>
          <h3>{response}</h3>
          <RxCross2 onClick={() => {setNotify(true)}}/>
          </div>}
          <h2>Login Now</h2>
          <p>Fill This Form</p>
          <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your email"
              />
            </span>
            <span>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your password"
              />
            </span>
            <span>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={confirmpassword}
                onChange={(e) => handleChange(e)}
                placeholder="Confirm password"
              />
            </span>
            <button type="submit">{loading ? "Loading..." : "Login"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;