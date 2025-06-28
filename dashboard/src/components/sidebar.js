import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/logo.png"
              style={{width: 1000, height: 90}}
              className="logo"
              alt="HR 360 Icon"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/register"
              >
               <i className="icon fas fa-regular fa-id-card"></i>
                <span className="text">Create Account</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-solid fa-building"></i>
                <span className="text">Department </span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/products"
              >
                <i className="icon fas fa-solid fa-user"></i>
                <span className="text">People </span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/addproduct"
              >
                <i className="icon fas fa-solid fa-user-plus"></i>
                <span className="text">Add People</span>
              </NavLink>
            </li>
            
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/tickets"
              >
                <i className="icon fas fa-ticket-alt"></i>
                <span className="text">Tickets</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/Payroll"
              >
                <i className="icon fas fa-regular fa-sack-dollar"></i>
                <span className="text">Payroll</span>
              </NavLink>
            </li>
            <li className="menu-item">
              { <NavLink
                activeClassName="active"
                className="menu-link"
                to="/Attendance"
              >
                <i className="icon fas fa-sharp fa-solid fa-clipboard-check"></i>
                <span className="text">Attendance</span>
              </NavLink> }
            </li>
            <li className="menu-item">
              { <NavLink
                activeClassName="active"
                className="menu-link"
                to="/Feedback"
              >
               <i className="icon fas fa-solid fa-comment-lines"></i>
                <span className="text">Feedback</span>
              </NavLink> }
            </li>
            <li className="menu-item">
              { <NavLink
                activeClassName="active"
                className="menu-link"
                to="/calendar"
              >
                <i className="icon fas fa-calendar"></i>
                <span className="text">Team Calendar</span>
              </NavLink> }
            </li>
            
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;