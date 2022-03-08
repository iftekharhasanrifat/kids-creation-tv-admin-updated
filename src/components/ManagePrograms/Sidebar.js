import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div style={{height:'92vh'}} className="side-bar">
      <nav className="flex-column nav-item">
        <Link className="link" to="/manageprogram">
          <i className="fas fa-tasks"></i>
          Manage Programs
        </Link>
        <Link className="link" to="/manageBanner">
          <i className="fas fa-file-upload"></i>
          Manage Banners
        </Link>
        <Link className="link" to="/manageUpcomingProgram">
          <i className="fas fa-file-upload"></i>
          Manage Upcioming Programs
        </Link>
        <Link className="link" to="/manageKidsNews">
          <i className="fas fa-newspaper"></i>
          Manage Kids News
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
