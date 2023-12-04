import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../css/userdashboard.module.css";

function Danger() {
  const [response, setResponse] = useState("");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const deleteUser = async () => {
    await axios
      .delete(`https://tanvirblog007-71b473c5e0c8.herokuapp.com/user/${id}`)
      .then((res) => {
        setResponse(res.data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("userlogo");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        setResponse(err.response.data.message);
      });
  };

  return (
    <div className={Style.dangerPage}>
      {response && <h3>{response}</h3>}
      <p>Delete your account</p>
      <button onClick={deleteUser}>Delete Account</button>
    </div>
  );
}

export default Danger;
