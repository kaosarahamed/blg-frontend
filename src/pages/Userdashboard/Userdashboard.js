import { Outlet } from "react-router-dom";
import Style from "./css/userdashboard.module.css";
import DashPanel from "./DashPanel";

function Userdashboard() {
  return (
    <div className={Style.dashboard}>
    <div className={Style.dashboardContainer}>
      <div className={Style.dashboardWrapper}>
            <DashPanel />
        <div className={Style.dashcontent}>
          <Outlet/>
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Userdashboard;