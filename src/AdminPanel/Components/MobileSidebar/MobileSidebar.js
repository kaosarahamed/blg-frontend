import axios from "axios";
import { useEffect, useState } from "react";
import { FaCog, FaLayerGroup, FaPlay, FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import Style from "./css/MobileSidebar.module.css";

function MobileSidebar(props) {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState("");
  useEffect(() => {
    axios
      .get("https://tanvirblog007-71b473c5e0c8.herokuapp.com/admin")
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
        setResponse(err.response.data.message);
      });
  }, []);

  return (
    <div
      className={`${Style.mobileSidebar} ${
        props.sidebar ? `${Style.active}` : `${Style.inactive}`
      }`}
      ref={props.isShowref}
    >
      <div className={Style.mobcontainer}>
        <h2>{response}</h2>
        <div className={Style.logo}>
          <img
            src={
              data.adminlogo &&
              "https://tanvirblog007-71b473c5e0c8.herokuapp.com" +
                data.adminlogo.replace("public", "")
            }
            alt=""
          />
        </div>
        <div className={Style.panelMenu}>
          <ul>
            <Link to="/dashboard">
              <FaLayerGroup />
              Dashboard
            </Link>
            <Link to="/posts">
              <FaPlay />
              Posts
            </Link>
            <Link to="/comments">
              <FaRegCommentDots />
              Comments
            </Link>
            <Link to="/settings">
              <FaCog />
              Settings
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
