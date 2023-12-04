import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../../src/App.css";
import useFetch from "../../Hooks/useFetch";
import Style from "./css/Slider.module.css";

function PostSlider({ post }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = post.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, post]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  const { adminData } = useFetch(
    "https://tanvirblog007-71b473c5e0c8.herokuapp.com/admin"
  );

  const authorLogo = adminData.map((item) => item.adminPic);
  const adminname = adminData.map((item) => item.adminname);

  return (
    <div className={Style.sliderSection}>
      <div className={Style.sliderContainer}>
        <div className={Style.sliderItems}>
          {post.map((item, indexPeople) => {
            const { title, description, categories } = item;
            let position = "nextSlide";
            if (indexPeople === index) {
              position = "activeSlide";
            }
            if (
              indexPeople === index - 1 ||
              (index === 0 && indexPeople === post.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <Link to={`/blogs/${item._id}`} state={{ item }} key={item._id}>
                <div className={`${Style.sliderArea} ${position}`}>
                  <div className={Style.imgageSiderbar}>
                    <img
                      src={
                        item.postbanner &&
                        "https://tanvirblog007-71b473c5e0c8.herokuapp.com" +
                          item.postbanner.replace("public", "")
                      }
                      alt=""
                    />
                  </div>
                  <div className={Style.contentSidebar}>
                    <div className={Style.category}>
                      {categories.map((cate, index) => (
                        <h3 key={index}>{cate}</h3>
                      ))}
                    </div>
                    <div className={Style.title}>
                      <h2>{title}</h2>
                    </div>
                    <div className={Style.adminBar}>
                      <img
                        src={
                          authorLogo[0] &&
                          "https://tanvirblog007-71b473c5e0c8.herokuapp.com" +
                            authorLogo[0].replace("public", "")
                        }
                        alt=""
                      />
                      <span>
                        <h4>{adminname}</h4>
                        <p>{new Date(item.createdAt).toDateString()}</p>
                      </span>
                    </div>
                    <div className={Style.body}>
                      <p>{description}</p>
                    </div>
                    <div className={Style.actionTab}>
                      <span>
                        <h4>Contineu Reading</h4>
                        <FaAngleRight />
                      </span>
                      <span>
                        <FaRegClock />
                        <h4>{Math.ceil(description.length / 500)} Min</h4>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={Style.arrows}>
          <FaAngleLeft
            onClick={() => setIndex(index - 1)}
            className={Style.leftArrow}
          />
          <FaAngleRight
            onClick={() => setIndex(index + 1)}
            className={Style.rightArrow}
          />
        </div>
      </div>
    </div>
  );
}

export default PostSlider;
