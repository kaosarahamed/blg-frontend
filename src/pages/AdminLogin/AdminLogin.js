import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./css/AdminLogin.module.css";

function AdminLogin({setIsLogin}) {


    const [author, setAuthor] = useState({
        email : "",
        password : ""
    });
    const {email, password} = author;
    const [isLoading, setIsLoading] = useState(false);
    const [responed, setResponed] = useState("");
const navigate = useNavigate()

    const handleChange = (e) => {
        setAuthor({...author, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        await axios.post("https://blog-app-fjqe.onrender.com/author/login", author)
        .then((res) => {
            setResponed(res.data.message)
            setIsLoading(false)
            setTimeout(() => {
              setIsLogin(true)
              navigate("/")
              }, 2000);
            }).catch((err) => {
              setResponed(err.response.data.message);
              setIsLoading(false)
            })
    }



  return (
    <div className={Style.adminLogin}>
      <div className={Style.adminContainer}>
        
        <div className={Style.adminLoginForm}>
        {responed && <h4>{responed}</h4>}
          <h2>Login Admin Panle</h2>
          <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your emall"
                onChange={(e) => handleChange(e)}
                required
                value={email}
              />
            </span>
            <span>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => handleChange(e)}
                required
                value={password}
              />
            </span>
            <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin