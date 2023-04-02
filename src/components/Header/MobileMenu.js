import { Link, useNavigate } from "react-router-dom";
import Style from "./css/MobileMenu.module.css";
function MobileMenu(props) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const logut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("userlogo");
    localStorage.removeItem("email");
    navigate("/login")
  }

  return (
    <div className={`${Style.Mobilemenu} ${
      props.menu ? `${Style.active}` : `${Style.inactive}`
    }`} ref={props.menuref}>
        <div className={Style.menuNav}>
          <ul>
          <li><Link to="/">Home</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/categories">Category</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            {token ? 
              <>
              <li><Link to="/user/dashboard">Dashboard</Link></li>
              <li><Link to="/login" onClick={logut}>Logout</Link></li>
              </>
              : 
              <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              </>
              }
          </ul>
        </div>
    </div>
  )
}

export default MobileMenu;