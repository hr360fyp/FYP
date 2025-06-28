import React from "react";
import { Link, NavLink } from "react-router-dom";

const ClientSidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/client" className="brand-wrap">
            <img
              src="/images/logo.png"
              style={{ width: 1000, height: 90 }}
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
                to="/client"
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
                to="/Tickt"
              >
                <i className="icon fas fa-ticket-alt"></i>
                <span className="text">Tickets</span>
              </NavLink>
            </li>

            <li className="menu-item">
              { <NavLink
                activeClassName="active"
                className="menu-link"
                to="/ClientFeedback"
              >
               <i className="icon fas fa-solid fa-comment-lines"></i>
                <span className="text">Feedback</span>
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

export default ClientSidebar;
