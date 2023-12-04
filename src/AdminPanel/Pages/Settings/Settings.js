import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./css/Settings.module.css";
function Settings() {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios
      .get("https://tanvirblog007-71b473c5e0c8.herokuapp.com/admin")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setResponse(err.response.data.message);
      });
  }, []);

  return (
    <div className={Style.settings}>
      <div className={Style.settingsContainer}>
        {response}
        {data.map((item, index) => {
          const {
            _id,
            adminname,
            about,
            facebook,
            twitter,
            linkedin,
            instagram,
            youtube,
            copytext,
            footerText,
            adminlogo,
            adminPic,
          } = item;
          return (
            <div className={Style.logoSetting} key={index}>
              <div className={Style.logoHeader}>
                <span>
                  <h2>Site Logo</h2>
                  <img
                    src={
                      adminlogo &&
                      "https://tanvirblog007-71b473c5e0c8.herokuapp.com" +
                        adminlogo.replace("public", "")
                    }
                    alt=""
                  />
                </span>
                <span>
                  <h2>Admin Profile Pic</h2>
                  <img
                    src={
                      adminPic &&
                      "https://tanvirblog007-71b473c5e0c8.herokuapp.com" +
                        adminPic.replace("public", "")
                    }
                    alt=""
                  />
                </span>
              </div>
              <div className={Style.commentBody}>
                <span>
                  <h2>Admin Name</h2>
                  <h3>{adminname}</h3>
                </span>
                <span>
                  <h2>About</h2>
                  <h3>{about}</h3>
                </span>
                <span>
                  <h2>Facebook</h2>
                  <h3>{facebook}</h3>
                </span>
                <span>
                  <h2>Twitter</h2>
                  <h3>{twitter}</h3>
                </span>
                <span>
                  <h2>Linkedin</h2>
                  <h3>{linkedin}</h3>
                </span>
                <span>
                  <h2>Instagram</h2>
                  <h3>{instagram}</h3>
                </span>
                <span>
                  <h2>Youtube</h2>
                  <h3>{youtube}</h3>
                </span>
                <span>
                  <h2>Copyright Text</h2>
                  <h3>{copytext}</h3>
                </span>
                <span>
                  <h2>Footer Text</h2>
                  <h3>{footerText}</h3>
                </span>
              </div>
              <div className={Style.button}>
                <Link to={`/settings/${_id}`} state={{ _id }}>
                  Edit Info
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;
