import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Style from "./css/SocialTab.module.css";
function SocialTab() {

  const {adminData} = useFetch("http://localhost:4000/admin");

  const fb = adminData.map(item => item.facebook);
  const tw = adminData.map(item => item.twitter);
  const li = adminData.map(item => item.linkedin);
  const ins = adminData.map(item => item.instagram);
  const you = adminData.map(item => item.youtube);


  return (
    <div className={Style.socialButtons}>
              <div className={Style.sochead}>
                <h4>Join us</h4>
                <h3>Follow Me</h3>
              </div>
                <Link to={fb[0]}>
              <div className={Style.socFb}>
                  <FaFacebookF />
                  <p>Follow Facebook</p>
              </div>
                </Link>
              <Link to={tw[0]}>
              <div className={Style.soctwit}>
                <FaTwitter />
                <p>Follow Twitter</p>
              </div>
              </Link>  
              <Link to={li[0]}>
              <div className={Style.socLink}>
                <FaLinkedinIn />
                <p>Connect On Linkedin</p>
              </div>
                </Link>  
              <Link to={ins[0]}>
              <div className={Style.socinsta}>
                <FaInstagram />
                <p>Follow Instagram</p>
              </div>
              </Link>  
              <Link to={you[0]}>
              <div className={Style.socYou}>
                <FaYoutube />   
                <p>Subscribe On Youtube</p>
              </div>
              </Link>  
            </div>
  )
}

export default SocialTab;