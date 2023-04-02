import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Style from "./css/AdminPages.module.css";
function AdminPages() {
  return (
    <div className={Style.dahsboardPages}>
              <div className={Style.pagesContainer}>
                <div className={Style.pagesHeader}>
                  <p>Page Title</p>
                  <p>Page Content</p>
                  <p>Page Actions</p>
                </div>
                <div className={Style.pageLists}>
                  <h2>This is title</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum adipisci, quod magni quasi magnam ex quas dolorem
                    consectetur officiis assumenda at dolores ipsam qui esse
                    provident? Vel quidem quisquam consectetur.
                  </p>
                  <span>
                  <Link to="">
                        <FaPenSquare />
                        <p>Edit Page</p>
                    </Link>
                    <Link to="">
                        <FaTrashAlt />
                        <p>Delete Page</p>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
  )
}

export default AdminPages;