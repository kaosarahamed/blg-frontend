import useFetch from "../../Hooks/useFetch";
import Style from "./css/PostWrapper.module.css";



function PostWrapper({data}) {

  const {adminData} = useFetch("https://blog-app-fjqe.onrender.com/admin");

  const authorLogo = adminData.map((item) => item.adminPic);
  const adminname = adminData.map((item) => item.adminname);

  return (
    <>
    <div className={Style.banner}>
            <img src={data.postbanner && "https://blog-app-fjqe.onrender.com"+data.postbanner.replace("public", "")} alt="" />
          </div>
          <div className={Style.content}>
            <div className={Style.adminWrapper}>
              <img
                src={authorLogo[0] && "https://blog-app-fjqe.onrender.com"+authorLogo[0].replace("public", "")}
                alt=""
              />
              <span>
                <h3>{adminname}</h3>
                <h4>{new Date(data.createdAt).toDateString()}</h4>
              </span>
            </div>
            <div className={Style.categore}>
              <ul>
                {data.categories.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <h2 className={Style.title}>
              {data.title}
            </h2>
            <p className={Style.body}>
              {data.description.slice(0, 500)}
            </p>
            <p className={Style.body}>
              {data.description.slice(501, 1000)}
            </p>
            <p className={Style.body}>
              {data.description.slice(1001, -1)}
            </p>
          </div>
    </>
  )
}

export default PostWrapper