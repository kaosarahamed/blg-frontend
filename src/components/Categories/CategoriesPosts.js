import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import Style from "./css/CategoriesPosts.module.css";
function CategoriesPosts() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const [filterPost, setFilterPost] = useState([]);
  const [postCount, setPostCount] = useState([]);
  const [getUniqPost, setgetUniqPost] = useState([]);

  useEffect(() => {
    axios
      .get("https://tanvirblog007-71b473c5e0c8.herokuapp.com/post/")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  const filterCate = (cate) => {
    const filterCategories = post.filter((curr) =>
      curr.categories.includes(cate)
    );
    setFilterPost(filterCategories);
  };

  useEffect(() => {
    const allcate = post.map((res) => res.categories);
    const mergeDedupe = (arr) => {
      return [...new Set([].concat(...arr))];
    };
    const uniqCategorie = mergeDedupe(allcate);
    setgetUniqPost(uniqCategorie);

    const newcategories = [];
    for (let i = 0; i < uniqCategorie.length; i++) {
      const filterCategories = post.filter((curr) =>
        curr.categories.includes(uniqCategorie[i])
      );
      newcategories.push(filterCategories);
    }
    setPostCount(newcategories);
  }, [post]);

  const mapCount = postCount.map((item) => item.length);

  return getUniqPost.map((cate, index) => {
    return (
      <div className={Style.catPost} key={index}>
        {error && <p>{error}</p>}
        <div
          className={Style.catPostContent}
          onMouseDown={() => filterCate(cate)}
        >
          <Link to="/categories/filpost" state={{ filterPost, cate }}>
            <h2>{cate}</h2>
            <div className={Style.catPostActionTab}>
              <span>
                <p>Total Posts</p>
                <FaAddressCard />
              </span>
              <h4>{mapCount[index]}</h4>
            </div>
          </Link>
        </div>
      </div>
    );
  });
}

export default CategoriesPosts;
