import useFetch from "../../Hooks/useFetch";
import Style from "./css/Footer.module.css";

function Footer() {

  const {adminData} = useFetch("https://blog-app-fjqe.onrender.com/admin");

  const footerText = adminData.map(item => item.footerText);
  const copyRightText = adminData.map(item => item.copytext);

  return (
    <footer>
      <div className={Style.footerContainer}>
        <p>{copyRightText}</p>
        <p>{footerText}</p>
      </div>
    </footer>
  )
}

export default Footer;