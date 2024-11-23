import { NavLink } from 'react-router-dom';


const ToolBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container">
          <NavLink to="/" className="text-decoration-none"><span
            className="navbar-brand mb-0 text-white fs-2 text-white">Track your finances</span></NavLink>

          <div className="ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <NavLink className="nav-link text-white" to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/add">Add</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default ToolBar;