import axios from "axios";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "../../Assists/images/beeple3.png";
import Style from "./css/Register.module.css";

function Register() {
  const [userlogo, setUserLogo] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [response, setResponse] = useState("");
  const { username, email, password, confirmpassword } = user;
  const [notify, setNotify] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmpassword", confirmpassword);
    formData.append("userlogo", userlogo);

    if (password.length < 8) {
      setResponse("Password should minimum 8 character");
      setLoading(false);
    } else if (password !== confirmpassword) {
      setResponse("Password does not match");
      setLoading(false);
    } else {
      await axios
        .post(
          "https://tanvirblog007-71b473c5e0c8.herokuapp.com/user/singup",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setResponse(res.data.message);
          setLoading(false);
        })
        .catch((err) => {
          setResponse(err.response.data.message);
          setLoading(false);
        });
      setUser({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
      fileRef.current.value = "";
    }
  };

  return (
    <div className={Style.contactUsSection}>
      <div className={Style.contactUsContainer}>
        <div className={Style.banner}>
          <img src={Image} alt="" />
        </div>
        <div className={Style.contactForm}>
          {response && (
            <div
              className={`${Style.notification} ${notify && `${Style.active}`}`}
            >
              <h3>{response}</h3>
              <RxCross2
                onClick={() => {
                  setNotify(true);
                }}
              />
            </div>
          )}
          <h2>Register Now</h2>
          <p>Fill This Form</p>
          <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="username">Your username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your username"
                required
              />
            </span>
            <span>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your email"
                required
              />
            </span>
            <span>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your password"
                required
              />
            </span>
            <span>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={confirmpassword}
                onChange={(e) => handleChange(e)}
                placeholder="Confirm password"
                required
              />
            </span>
            <span>
              <label htmlFor="userlogo">User Logo</label>
              <input
                type="file"
                name="userlogo"
                id="userlogo"
                ref={fileRef}
                onChange={(e) => setUserLogo(e.target.files[0])}
                placeholder="Add your logo"
                required
              />
            </span>
            <button type="submit">{loading ? "Loading..." : "Register"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
