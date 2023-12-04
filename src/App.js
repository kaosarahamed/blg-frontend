import { MutatingDots } from "react-loader-spinner";
import "../src/Assists/css/App.css";
import useFetch from "./Hooks/useFetch";
import AppRoutes from "./routes/AppRoutes";
function App() {
  const { adminData } = useFetch(
    "https://tanvirblog007-71b473c5e0c8.herokuapp.com/post/"
  );

  return (
    <>
      {adminData.length > 0 ? (
        <AppRoutes />
      ) : (
        <div className="loader">
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </>
  );
}

export default App;
