import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "white" };
  return (
    <div className="d-flex nav-bar p-3 justify-content-start">
      <NavLink className="nav mx-2" to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      <NavLink className="nav mx-2" to="/fav" activeStyle={activeStyle}>
        My Fav
      </NavLink>
      <NavLink className="nav mx-2" to="/list" activeStyle={activeStyle}>
        My List
      </NavLink>
    </div>
  );
};

export default Header;
