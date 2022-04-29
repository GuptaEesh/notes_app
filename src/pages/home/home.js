import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
const Home = () => {
  return (
    <div className="flex flex-col h-screen items-center home">
      <figure className="cursor-pointer text-4xl p-2">🔷</figure>
      <div className="bg-light_background rounded p-2 flex flex-col justify-around items-center h-[30vh] m-[15%]">
        <p className="font-medium">
          Let us remember for you. You get them done.
        </p>
        <Link
          className="rounded p-1 text-3xl bg-primary text-secondary"
          to="/notes"
        >
          Explore &gt;
        </Link>
      </div>
    </div>
  );
};

export { Home };
