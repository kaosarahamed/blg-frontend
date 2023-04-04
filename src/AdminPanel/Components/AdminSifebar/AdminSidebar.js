import axios from "axios";
import { useEffect, useState } from "react";
import { FaCog, FaLayerGroup, FaPlay, FaRegCommentDots } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Style from './css/AdminSidebar.module.css';
function AdminSidebar() {

  const [data, setData] = useState([]);
  const [response, setResponse] = useState("");
  useEffect(() => {
    

    axios.get("https://blog-app-fjqe.onrender.com/admin")
    .then((res) => {
      setData(res.data[0])
    }).catch((err) => {
      setResponse(err.response.data.message)
    })

  },[]);


  return (
    <div className={Style.sitePanel}>
            <div className={Style.logo}>
              {response}
              <img src={data.adminlogo && "https://blog-app-fjqe.onrender.com"+data.adminlogo.replace("public", "")} alt="" />
            </div>
            <div className={Style.panelMenu}>
              <ul>
                <Link to="/dashboard"><FaLayerGroup />Dashboard</Link>
                <Link to="/posts"><FaPlay />Posts</Link>
                <Link to="/comments"><FaRegCommentDots />Comments</Link>
                <Link to="/settings"><FaCog />Settings</Link>
              </ul>
            </div>
          </div>
  )
}

export default AdminSidebar;