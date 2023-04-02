import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';
import Style from "./css/EditSetting.module.css";
function EditSetting() {

    const [data, setData] = useState([])
    const {adminname, about, facebook, twitter, linkedin, instagram, youtube, copytext, footerText} = data;
    const [notify, setNotify] = useState(false);
    const [adminlogo, setadminlogo] = useState(null);
    const [adminPic, setadminPic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
   const location = useLocation();
   const id = location.state._id
   
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("adminname", adminname);
        formData.append("about", about);
        formData.append("facebook", facebook);
        formData.append("twitter", twitter);
        formData.append("linkedin", linkedin);
        formData.append("instagram", instagram);
        formData.append("youtube", youtube);
        formData.append("copytext", copytext);
        formData.append("footerText", footerText);
        formData.append("adminlogo", adminlogo)
        formData.append("adminPic", adminPic)



    await axios.patch(`http://localhost:4000/admin/${id}`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    }})
          .then((res) => {
            setResponse(res.data.message);
            setLoading(false)
          }).catch((err) => {
            setResponse(err.response.data.message);
            setLoading(false)
          });
    }


    const getData = async () => {
    await axios.get("http://localhost:4000/admin")
    .then((res) => {setData(res.data[0])}).catch((err) => setData(err.data.response.message))
    }

useEffect(() => {
    getData()
},[])

const handleChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
}

  return (
    <div className={Style.editSetting}>
      <div className={Style.settingContainer}>
      {response && <div className={`${Style.notification} ${
        notify && `${Style.active}`}`}>
          <h3>{response}</h3>
          <RxCross2 onClick={() => {setNotify(true)}}/>
          </div>}
            <div className={Style.editSettingForm}>
            <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="adminname">Enter Admin Name</label>
              <input
                type="text"
                name="adminname"
                id="adminname"
                onChange={(e) => handleChange(e)}
                placeholder="Enter title"
                value={adminname || ""}
              />
            </span>
            <span>
              <label htmlFor="about">Enter About Infor</label>
              <textarea name="about" id="about" value={about} placeholder="write about info"  onChange={(e) => handleChange(e)} cols="30" rows="10"></textarea>
            </span>
            <span>
              <label htmlFor="facebook">Enter Facebook Url</label>
              <input
                type="text"
                name="facebook"
                id="facebook"
                onChange={(e) => handleChange(e)}
                placeholder="Enter facebook url"
                value={facebook || ""}
              />
            </span>
            <span>
              <label htmlFor="twitter">Enter Twitter Url</label>
              <input
                type="text"
                name="twitter"
                id="twitter"
                onChange={(e) => handleChange(e)}
                placeholder="Enter title"
                value={twitter || ""}
              />
            </span>
            <span>
              <label htmlFor="linkedin">Enter Linkedin Url</label>
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                onChange={(e) => handleChange(e)}
                placeholder="Enter title"
                value={linkedin || ""}
              />
            </span>
            <span>
              <label htmlFor="instagram">Enter Instagram Url</label>
              <input
                type="text"
                name="instagram"
                id="instagram"
                onChange={(e) => handleChange(e)}
                placeholder="Enter title"
                value={instagram || ""}
              />
            </span>
            <span>
              <label htmlFor="youtube">Enter Youtube Url</label>
              <input
                type="text"
                name="youtube"
                id="youtube"
                onChange={(e) => handleChange(e)}
                placeholder="Enter title"
                value={youtube || ""}
              />
            </span>
            <span>
              <label htmlFor="copytext">Enter Copyright Text</label>
              <input
                type="text"
                name="copytext"
                id="copytext"
                onChange={(e) => handleChange(e)}
                placeholder="Enter title"
                value={copytext || ""}
              />
            </span>
            <span>
              <label htmlFor="footerText">Enter Footer Text</label>
              <input
                type="text"
                name="footerText"
                id="footerText"
                onChange={(e) => handleChange(e)}
                placeholder="Enter title"
                value={footerText || ""}
              />
            </span>
            <span>
              <label htmlFor="postbanner">Admin Logo</label>
              <input 
              type="file" 
              name="adminlogo" 
              id="adminlogo"
              onChange={(e) => setadminlogo(e.target.files[0])} 
              required
              />
            </span>
            <span>
              <label htmlFor="postbanner">Admin Profile Pic</label>
              <input 
              type="file" 
              name="adminPic" 
              id="adminPic"
              onChange={(e) => setadminPic(e.target.files[0])}
              required 
              />
            </span>
            <button type="submit">{loading ? "Loading..." : "Save Setting"}</button>
            </form>
     </div>
      </div>
    </div>
  )
}

export default EditSetting