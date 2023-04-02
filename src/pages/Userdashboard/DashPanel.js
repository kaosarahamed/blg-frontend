import { FaExclamationCircle, FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Style from './css/userdashboard.module.css';

function DashPanel() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  return (
    <div className={Style.dashPanel}>
          <div className={Style.dashPanelHeader}>
            <h2>{username}</h2>
            <p>{email}</p>
          </div>
          <div className={Style.dashmenu}>
            <Link to="/user/dashboard">
              <FaUserAlt />
              <h4>Profile</h4>
            </Link>
            <Link to="/user/dashboard/danger">
            <FaExclamationCircle />
              <h4>Danger</h4>
            </Link>
            
          </div>
        </div>
  )
}

export default DashPanel