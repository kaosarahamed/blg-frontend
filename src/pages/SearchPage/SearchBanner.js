import Style from './css/SearchBanner.module.css';

function SearchBanner({search}) {
  return (
    <div className={Style.bannerBlog}>
      <div className={Style.bannerContainer}>
        <h2>Search For : {search}</h2>
      </div>
    </div>
  )
}

export default SearchBanner