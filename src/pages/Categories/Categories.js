import CategoriesPosts from '../../components/Categories/CategoriesPosts';
import CategoriesBanner from './CategoriesBanner';
import Style from "./css/Cetagories.module.css";

function Categories() {
  return (
    <>
    <CategoriesBanner />
    <div className={Style.catPostsList}>
    <CategoriesPosts />
    </div>
    </>
  )
}

export default Categories;