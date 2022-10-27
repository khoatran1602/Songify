import Cover from "./page-not-found.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-contain bg-no-repeat bg-center mt-10"
      style={{ backgroundImage: "url(" + Cover + ")" }}
    >
      <div id="wrapper" className="grid">
        <button
          onClick={() => navigate("/main-page")}
          className="
                        text-white
                        bg-blue-500
                        font-bold
                        rounded
                        text-sm
                        px-5 py-2.5
                        dark:bg-blue-600
                        dark:hover:bg-blue-700
                        focus:outline-none
                        dark:focus:ring-blue-800
                        place-self-center
                        mt-80"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
export default PageNotFound;
