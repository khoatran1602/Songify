import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../../store/songApi.slice";
import { LoaderSong } from "../LoadingScreen/LoadingScreen";
import PageNotFound from "../ErrorPage";
import DetailsHeader from "../DetailHeader";
import { RiHeart3Fill } from "react-icons/ri";
import { songAPIEndpoint } from "../../config";
import axios from "axios";
import { useAppSelector } from "../../store/hooks";
import { showNotification } from "@mantine/notifications";

const SongDetails = () => {

  const { songid, id: artistId } = useParams();
  const { isFetching: isFetchinRelatedSongs, error } = useGetSongRelatedQuery({
    songid,
  });
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const [iconColor, setIconColor] = useState("white");
  const { data } = useGetSongDetailsQuery({ songid });
  const user = useAppSelector((state) => state.user.user);

  if (isFetchingSongDetails && isFetchinRelatedSongs) {
    return <LoaderSong title="Searching song details" />;
  }

  if (error) return <PageNotFound />;

  const addFavorite = async () => {
    try {
      var id = {
        userId: `${user?.id}`,
        id: `${data.key}`,
        coverArt: `${data.images?.coverart}`,
      };
      const song = Object.assign(id, data);
      axios.post(songAPIEndpoint, song);
      showNotification({
        title: "Song Added Successfully",
        color: "green",
        message: `'${song.title}' has been added!`,
      });
    } catch (e) {
      showNotification({
        title: "Failed to add this song",
        message: "Something went wrong! Try again later!",
        color: "red",
      });
    }
  };

  const removeFavorite = () => {
    var id = { userId: `${user?.id}`, id: `${data.key}` };
    const song = Object.assign(id, data);
    try {
      axios.delete(songAPIEndpoint, {
        headers: {
          Accept: "*",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "*",
        },
        data: JSON.stringify(song),
        params: { userId: user?.id },
      });
      showNotification({
        title: "Song Deleted Successfully",
        color: "green",
        message: `'${song.title}' has been deleted!`,
      });
    } catch (e) {
      showNotification({
        title: "Failed to delete this song",
        message: "Something went wrong! Try again later!",
        color: "red",
      });
    }
  };

  return (
    <div className="flex flex-col bg-[#191624]">
      <DetailsHeader artistId={artistId} songData={songData} />
      <RiHeart3Fill
        className="heart text-2xl m-auto"
        style={{ color: iconColor }}
        onClick={() => {
          setIconColor(iconColor === "white" ? "red" : "white");
          iconColor === "white" ? addFavorite() : removeFavorite();
        }}
      />

      <div>
        <h2 className="text-white text-3xl font-bold bg-[#191624] flex justify-center items-center">
          Lyrics:
        </h2>
        <div className="bg-[#191624]">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1]?.text.map(
              (
                line:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined,
                i: any
              ) => (
                <p
                  key={`lyrics-${line}-${i}`}
                  className="text-gray-400 text-base my-1 flex justify-center items-center"
                >
                  {line}
                </p>
              )
            )
          ) : (
            <p className="text-gray-400 text-base my-1 mb-96 flex justify-center items-center">
              Sorry, No lyrics found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
