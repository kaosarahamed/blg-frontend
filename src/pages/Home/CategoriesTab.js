import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./css/CategoriesTab.module.css";

function CategoriesTab({post}) {

const [uniqpost, setuniqPost] = useState([]);
const [postCount, setPostCount] = useState([]);
const [filterPost, setFilterPost] = useState([]);

const filterCate = (cate) => {
  const filterCategories = post.filter((curr) => curr.categories.includes(cate))
  setFilterPost(filterCategories)
}

  useEffect(() => {
    
    const allcate = post.map((res) => res.categories);
    const mergeDedupe = (arr) => {
      return [...new Set([].concat(...arr))];
    }
    const uniqCategorie =  mergeDedupe(allcate);
    setuniqPost(uniqCategorie)

    const newcategories = []
for(let i = 0; i < uniqCategorie.length; i++){
  const filterCategories = post.filter((curr) => curr.categories.includes(uniqCategorie[i]));
  newcategories.push(filterCategories)
}
  setPostCount(newcategories)

  },[post])

  const mapCount = postCount.map((item) => item.length);

  return (
    <div className={Style.categoryLists}>
              <h2>Latest Category</h2>
              {uniqpost.map((cate, index) => 
                <Link to="/categories/filpost"  state={{filterPost, cate}} onMouseDown={() => filterCate(cate)} key={index}>
                <span>
                <p>{cate}</p>
                <p>{mapCount[index]}</p>
              </span>
                </Link>
              )}
            
            </div>
  )
}

export default CategoriesTab