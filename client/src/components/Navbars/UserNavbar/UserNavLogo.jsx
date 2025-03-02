import React from "react";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import WebsiteLogo from "../../../assets/main-logo.png";

const UserNavLogo = () => {
  return (
    <Tippy content="Urbanhaven" className="bg-red-400">
      <NavLink to="/">
        <img src={WebsiteLogo} alt="UrbanHaven" className="w-16 sm:w-20 lg:w-24" />
      </NavLink>
    </Tippy>
  );
};

export default UserNavLogo;
