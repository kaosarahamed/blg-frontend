import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Style from "./css/WidgetOne.module.css";
function WidgetOne() {

  const {adminData} = useFetch("https://blog-app-fjqe.onrender.com/admin");

  const fb = adminData.map(item => item.facebook);
  const tw = adminData.map(item => item.twitter);
  const li = adminData.map(item => item.linkedin);
  const ins = adminData.map(item => item.instagram);
  const you = adminData.map(item => item.youtube);
  const body = adminData.map(item => item.about);
  const authorLogo = adminData.map((item) => item.adminlogo)
  return (
    <div className={Style.widgetOne}>
            <img src={authorLogo[0] && "https://blog-app-fjqe.onrender.com"+authorLogo[0].replace("public", "")} alt="" />
            <p>
             {body}
            </p>
            <div className={Style.socicons}>
              <Link to={fb[0]}><FaFacebookF /></Link>
              <Link to={tw[0]}><FaTwitter /></Link>
              <Link to={li[0]}><FaLinkedinIn /></Link>
              <Link to={ins[0]}><FaInstagram /></Link>
              <Link to={you[0]}><FaYoutube /></Link>
              
              
              
              
            </div>
          </div>
  )
}

export default WidgetOne;