import React from 'react';
import { useLocation } from 'react-router-dom';
import GridPosts from '../../components/GridPosts/GridPosts';
import CategoriesBanner from './CategoriesBanner';
import Style from "./css/Cetagories.module.css";

function CategorieFilterPosts() {

    const location = useLocation();
    const item = location.state.filterPost;
    const cateName = location.state.cate;
  return (
    <>
    <CategoriesBanner cateName={cateName}/>
    <div className={Style.catPostsList}>
    <GridPosts post={item}/>
    </div>
    </>
    )
}

export default CategorieFilterPosts