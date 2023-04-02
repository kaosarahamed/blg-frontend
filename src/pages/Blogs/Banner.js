import Style from './css/Banner.module.css';

function Banner() {
  return (
    <div className={Style.bannerBlog}>
      <div className={Style.bannerContainer}>
        <h2>Blogs</h2>
        <p>See Our All Blog Posts</p>
      </div>
    </div>
  )
}

export default Banner;