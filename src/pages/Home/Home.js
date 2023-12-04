import axios from "axios";
import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import GridPosts from "../../components/GridPosts/GridPosts";
import ListPosts from "../../components/ListPosts/ListPosts";
import CategoriesTab from "./CategoriesTab";
import PostSlider from "./PostSlider";
import SocialTab from "./SocialTab";
import SubscriptionSection from "./SubscriptionSection";
import TrendingPosts from "./TrendingPosts";
import Style from "./css/Home.module.css";

function Home() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");

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

  const gridPost = post.slice(0, 8);
  const listPost = post.slice(0, 5);
  const sliderPost = post.slice(0, 4);
  const trendPost = post.slice(0, 6);

  return (
    <>
      <PostSlider post={sliderPost} />
      {error && <p>{error}</p>}
      <div className={Style.postSection}>
        <div className={Style.postContainer}>
          <div className={Style.postWrapper}>
            <div className={Style.postArea}>
              <div className={Style.postHeader}>
                <p>See my latest posts</p>
                <h2>Latest Posts</h2>
              </div>
              <div className={Style.LatestPosts}>
                <GridPosts post={gridPost} />
              </div>
            </div>
            <div className={Style.contentArea}>
              <div>
                <div className={Style.postHeader}>
                  <p>Chosen by the editor</p>
                  <h2>Editors Picks</h2>
                </div>
                <ListPosts post={listPost} />
              </div>

              <SocialTab />
              <CategoriesTab post={sliderPost} />
              <TrendingPosts post={trendPost} />
            </div>
          </div>
        </div>
      </div>

      <SubscriptionSection />
      <Outlet />
    </>
  );
}

export default Home;
