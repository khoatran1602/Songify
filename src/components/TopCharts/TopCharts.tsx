import React from "react";
import { useAppSelector } from "../../store/hooks";
import { useGetTopChartsQuery } from "../../store/songApi.slice";
import { Song } from "../../types";
import PageNotFound from "../ErrorPage";
import { LoaderSong } from "../LoadingScreen/LoadingScreen";
import SideBar from "../SideBar";
import SongCard from "../SongCard";

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);

  if (isFetching) return <LoaderSong title="Loading Top Charts" />;

  if (error) return <PageNotFound />;

  return (
    <div className="flex flex-col bg-[#191624]">
      <div className="relative flex flex-row bg-[#191624]">
        <SideBar />
        <div className="relative flex flex-col bg-[#191624]">
          <h2 className="font-bold text-3xl text-white text-left m-auto my-4">
            Discover Top Charts
          </h2>

          <div className="flex flex-wrap sm:justify-start justify-center">
            {data?.map((song: Song, i: number) => (
              <SongCard
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                i={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCharts;
