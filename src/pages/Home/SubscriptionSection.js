import Style from "./css/SubSec.module.css";

function SubscriptionSection() {
  return (
    <div className={Style.SubscribeSection}>
      <div className={Style.subscribeContainer}>
        <div className={Style.subscribeWrapper}>
          <h2>Subscribe To Join Us</h2>
          <p>Subscribe to my newsletter for all the latest updates:</p>
          <form>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter you name"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionSection;