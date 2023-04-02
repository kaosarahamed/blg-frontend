import { Link } from "react-router-dom";
import Style from "./css/WidgetTow.module.css";

function WidgetTow() {
  return (
    <div className={Style.widgetTow}>
            <h2>Important Links</h2>
            <span>
              <Link to="/">Home</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/admin/login">Admin Panel</Link>
            </span>
          </div>
  )
}

export default WidgetTow;