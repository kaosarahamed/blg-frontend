import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Style from "./css/SearchForm.module.css";

function SearchForm(props) {
  const [search, setSearch] = useState("");
  const { adminData } = useFetch(
    "https://tanvirblog007-71b473c5e0c8.herokuapp.com/post/"
  );
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const filterData = adminData.filter((data) =>
      data.title.toLowerCase().includes(search.toLowerCase())
        ? adminData
        : search === ""
        ? adminData
        : null
    );
    navigate("/search", { state: { filterData, search } });
    setSearch("");
    props.setSearch(false);
  };

  return (
    <div
      ref={props.searchref}
      className={`${Style.searchForm} ${
        props.search ? `${Style.active}` : `${Style.inactive}`
      }`}
    >
      <div className={Style.searchFormContainer}>
        <h2>Search your posts</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search your posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
