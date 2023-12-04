import { useEffect, useRef, useState } from "react";
import { RxCross2, RxHamburgerMenu, RxMagnifyingGlass } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import MobileMenu from "./MobileMenu";
import SearchForm from "./SearchForm";
import Style from "./css/Header.module.css";

function Header() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const menuref = useRef();
  const searchref = useRef();
  useEffect(() => {
    let handeler = (e) => {
      if (menuref.current !== null) {
        if (!menuref.current.contains(e.target)) {
          setMenu(false);
        }
      } else {
        return null;
      }
      if (!searchref.current.contains(e.target)) {
        setSearch(false);
      }
    };
    document.addEventListener("mousedown", handeler);
  }, []);

  const logo = localStorage.getItem("userlogo");
  const replacepath = logo && logo.replace("public", "");
  const replacelogo =
    "https://tanvirblog007-71b473c5e0c8.herokuapp.com" + replacepath;
  const token = localStorage.getItem("token");

  const logut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("userlogo");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const { adminData } = useFetch(
    "https://tanvirblog007-71b473c5e0c8.herokuapp.com/admin"
  );

  const authorLogo = adminData.map((item) => item.adminlogo);

  return (
    <header>
      <div className={Style.headerContainer}>
        <div className={Style.logoAre}>
          <Link to="/">
            <img
              src={
                authorLogo[0] &&
                "https://tanvirblog007-71b473c5e0c8.herokuapp.com" +
                  authorLogo[0].replace("public", "")
              }
              alt=""
            />
          </Link>
        </div>
        <div className={Style.menuArea}>
          <div className={Style.menu}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/categories">Category</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {token ? (
                <>
                  <li>
                    <Link to="/user/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={logut}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <span onClick={() => setSearch(!search)}>
            {search ? <RxCross2 /> : <RxMagnifyingGlass />}
          </span>
          <p onClick={() => setMenu(!menu)}>
            {menu ? <RxCross2 /> : <RxHamburgerMenu />}
          </p>
          {token && <img src={replacelogo && replacelogo} alt="" />}
        </div>
      </div>
      <SearchForm searchref={searchref} search={search} setSearch={setSearch} />
      <MobileMenu menuref={menuref} menu={menu} setMenu={setMenu} />
    </header>
  );
}

export default Header;
