import Style from "./css/FooterWidget.module.css";
import WidgetOne from './WidgetOne';
import WidgetThree from './WidgetThree';
import WidgetTow from './WidgetTow';

function FooterWidget() {
  return (
    <div className={Style.footerWidgetSection}>
      <div className={Style.footerWidgetContainer}>
        <div className={Style.widgets}>
          <WidgetOne />
          <WidgetTow />
          <WidgetThree />
        </div>
      </div>
    </div>
  )
}

export default FooterWidget;