import React from "react";
import { Songs } from "../../types";

const FavoriteCard = ({ song }: { song: Songs}) => {
  console.log(song)
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer bg-[#191624]">
      <div className="relative w-full h-56 group">
        <img
          alt="song_img"
          src={song.coverart}
          loading="lazy"
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          {song.title}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">{song.subtitle}</p>
      </div>
    </div>
  );
};

export default FavoriteCard;
