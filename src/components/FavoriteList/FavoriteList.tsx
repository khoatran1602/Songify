import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import SideBar from "../SideBar";
import axios from "axios";
import { songAPIEndpoint } from "../../config";
import FavoriteCard from "../FavoriteCard";
import { Songs } from "../../types";
import Searchbar from "../Searchbar";

export default function FavoriteList() {
  const user = useAppSelector((state) => state.user.user);
  const [list, setList] = useState<Songs[]>([]);

  const getSongs = useCallback(async () => {
    const { data } = await axios.get(songAPIEndpoint, {
      params: { userId: user?.id },
    });
    setList(data);
  }, [user?.id]);

  useEffect(() => {
    getSongs();
  }, [getSongs])
  

  return (
    <div className="flex flex-col bg-[#191624] h-screen">
      <div className="flex flex-row bg-[#191624]">
        <SideBar />
        <div className="flex flex-col">
          <Searchbar />
          <div className="flex flex-wrap sm:justify-start justify-center gap-4 mb-auto">
            {list?.map((song: Songs, i: number) => (
              <FavoriteCard key={song.key} song={song} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
