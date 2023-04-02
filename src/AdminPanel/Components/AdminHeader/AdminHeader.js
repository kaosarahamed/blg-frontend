import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import Style from './css/AdminHeader.module.css';
function AdminHeader({setIsLogin}) {

  const [sidebar, setSidebar] = useState(false);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState("");
  const isShowref = useRef();
  useEffect(() => {
    let handeler = (e) => {
      if (!isShowref.current.contains(e.target)) {
        setSidebar(false);
      }
    };
    document.addEventListener("mousedown", handeler);

    axios.get("http://localhost:4000/admin")
    .then((res) => {
      setData(res.data[0])
    }).catch((err) => {
      setResponse(err.response.data.message)
    })

  });

  return (
     <div className={Style.adminBard}>
     <div className={Style.headerNav} >
      {response}
              <div className={Style.mobileMenu}>
              <p onClick={() => setSidebar(!sidebar)}>{sidebar ? <RxCross2 /> : <RxHamburgerMenu />}</p>
              </div>
              <div className={Style.navContainer}>
                <Link to="" onClick={() => setIsLogin(false)}>Logout</Link>
                <img
                  src={data.adminPic && "http://localhost:4000"+data.adminPic.replace("public", "")}
                  alt=""
                  
                />
              </div>
      </div>
      <MobileSidebar isShowref={isShowref} sidebar={sidebar} setSidebar={setSidebar} />
     </div>
  )
}

export default AdminHeader;