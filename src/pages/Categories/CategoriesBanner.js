import Style from './css/CatBanner.module.css';

function CategoriesBanner({cateName}) {
  return (
    <div className={Style.categorieBanner}>
      <div className={Style.categorieBannerContainer}>
        <h2>{cateName ? cateName : "see our all categories"}</h2>
      </div>
    </div>
  )
}

export default CategoriesBanner;