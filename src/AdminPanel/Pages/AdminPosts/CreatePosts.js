import axios from "axios";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Style from './css/CreatePosts.module.css';

function CreatePosts() {
    const [postbanner, setpostbanner] = useState(null);
const [posts, setPosts] = useState({
    title : "",
    description : "",
});
const {title, description} = posts;
const [response, setResponse] = useState("");
const [notify, setNotify] = useState(false);
const [loading, setLoading] = useState(false);
const [categories, setCategorie] = useState([]);
const fileRef = useRef();

const handleChange = (e) => {
    setPosts({...posts, [e.target.name] : e.target.value})
}
const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();
const formData = new FormData();
formData.append("title", title);
formData.append("description", description);
categories.forEach(item => {formData.append("categories[]", item)})
formData.append("postbanner", postbanner)
await axios.post("http://localhost:4000/post", formData, {
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
          setPosts({
            title : "",
            description : "",
          });
          setCategorie([]);
          fileRef.current.value = ""
  
}

const handleKeyDown = (e) => {
    if(e.key === "Enter"){
        setCategorie([...categories, e.target.value])
        e.target.value = ""
    }
    
}
const deleteCategorie = (e) => {
    setCategorie(categories.filter((item, id) => id !== e))
}

  return (
    <div className={Style.createPosts}>
      <div className={Style.createForm}>
      {response && <div className={`${Style.notification} ${
        notify && `${Style.active}`}`}>
          <h3>{response}</h3>
          <RxCross2 onClick={() => {setNotify(true)}}/>
          </div>}
     <div className={Style.form}>
     <span>
              <label htmlFor="title">Enter Title</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => handleChange(e)}
                placeholder="Enter title"
                value={title}
              />
            </span>
            <span>
              <label htmlFor="description">Enter Description</label>
              <textarea name="description" id="description" onChange={(e) => handleChange(e)} placeholder="Enter description" cols="30" rows="10" value={description}>
                Enter description
              </textarea>
            </span>
            <span className={Style.tagSpan}>
            {categories.map((item, index) => 
                <div className={Style.tags} key={index}>
                <h4>{item}</h4>
                <RxCross2 onClick={() => deleteCategorie(index)}/>
            </div>
            )}
            <input type="text" onKeyDown={handleKeyDown} className={Style.Categories} placeholder="Enter Categories"
            />
            </span>
            <span>
              <label htmlFor="postbanner">Post Banner</label>
              <input 
              type="file" 
              name="postbanner" 
              id="postbanner"
              ref={fileRef}
              onChange={(e) => setpostbanner(e.target.files[0])} 
              />
            </span>
            <button onClick={handleSubmit}>{loading ? "Loading..." : "Create Post"}</button>
     </div>
      </div>
    </div>
  )
}

export default CreatePosts;
