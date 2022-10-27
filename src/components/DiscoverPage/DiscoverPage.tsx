import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PageNotFound from "../ErrorPage";
import { useAppSelector } from "../../store/hooks";
import { selectGenreListId } from "../../store/playerSlice";
import { useGetSongsByGenreQuery } from "../../store/songApi.slice";
import { LoaderSong } from "../LoadingScreen/LoadingScreen";
import { genres, Song, Songs } from "../../types";
import SongCard from "../SongCard";
import axios from "axios";
import { songAPIEndpoint } from "../../config";

const Discover = () => {
  const dispatch = useDispatch();
  const genreListId = useAppSelector((state) => state.player.genreListId);
  const activeSong = useAppSelector((state) => state.player.activeSong);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) return <LoaderSong title="Loading songs..." />;

  if (error) return <PageNotFound />;

  const genreTitle = genres.find(
    ({ value }: {value: string}) => value === genreListId
  )?.title;

  return (
    <div className="relative flex flex-col bg-[#191624]">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre: {title: string, value: string} ) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
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
  );
};

export default Discover;
