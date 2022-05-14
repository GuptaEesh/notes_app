import React from "react";
import { Link } from "react-router-dom";
import { useAuth, useData } from "../../helpers/context";
import { requests } from "../../helpers/utils";
import "./home.css";
const Home = () => {
  const { isAuthenticated } = useAuth();
  const {loader}=useData();
  return (
    !loader && <div className="flex flex-col h-screen w-screen items-center home">
      <figure className="cursor-pointer text-4xl p-2">🔷</figure>
      <div className="bg-glass rounded p-2 flex flex-col justify-around items-center h-[30vh] m-[15%]">
        <p className="font-medium text-primary">
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
