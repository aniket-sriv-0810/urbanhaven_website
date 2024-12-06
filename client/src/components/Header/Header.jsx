import React from "react";
import { useUser } from "../userContext/userContext.jsx";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="p-7 bg-green-600 m-4 text-white text-center">
      <h1>{user ? `Welcome, ${user}!` : "Hi, User!"}</h1>
    </header>
  );
};

export default Header;
