import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useGetSongsBySearchQuery } from "../../store/songApi.slice";
import { Song } from "../../types";
import AudioPlayer from "../AudioPlayer";
import PageNotFound from "../ErrorPage";
import { LoaderSong } from "../LoadingScreen/LoadingScreen";
import SongCard from "../SongCard";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits.map(
    (song: { track: Song }) => song.track
  );

  if (isFetching) return <LoaderSong title={`Searching ${searchTerm}...`} />;

  if (error) return <PageNotFound />;

  return (
    <div className="relative flex flex-col bg-[#191624]">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="relative h-28 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
        <AudioPlayer />
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song: Song, i: number) => (
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
  );
};

export default Search;
