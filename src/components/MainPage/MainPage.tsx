import SideBar from "../SideBar";
import React from "react";
import DiscoverPage from "../DiscoverPage";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Searchbar from "../Searchbar/Searchbar";

const MainPage = () => {
  return (
    <div className="relative flex">
      <SideBar />
      <div className="flex-1 flex flex-col bg-gradient-to-br bg-[#191624]">
        <Searchbar />
        <div className="realtive h-[calc(90vh)] overflow-y-scroll scrollbar-hide flex xl:flex-row flex-col-reverse">
          <DiscoverPage />
        </div>
      </div>
      <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
        <AudioPlayer />
      </div>
    </div>
  );
};

export default MainPage;
