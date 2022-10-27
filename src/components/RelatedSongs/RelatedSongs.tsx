import React from 'react';
import { Song } from '../../types';
import SongBar from '../SongBar';


const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick } : any) => (
  <div className="flex flex-col bg-[#191624]">
    <h1 className="font-bold text-3xl text-white bg-[#191624]">Related Songs:</h1>

    <div className="mt-6 w-full flex flex-col bg-[#191624]">
      {data?.map((song : Song, i : any) => (
        <SongBar
          key={`${artistId}-${song.key}-${i}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;