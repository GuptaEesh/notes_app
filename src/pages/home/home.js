import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../helpers/context";
import { requests } from "../../helpers/utils";
import "./home.css";
const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-col h-screen w-screen items-center home">
      <figure className="cursor-pointer text-4xl p-2">🔷</figure>
      <div className="bg-light_background rounded p-2 flex flex-col justify-around items-center h-[30vh] m-[15%]">
        <p className="font-medium">
          Let us remember for you. You get them done.
        </p>
        <Link
          className="rounded px-6 py-4 text-3xl bg-primary text-secondary"
          to={isAuthenticated ? requests.notes : requests.login}
        >
          Explore &gt;
        </Link>
      </div>
    </div>
  );
};

export { Home };
