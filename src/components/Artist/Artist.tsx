import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useGetArtistDetailsQuery } from '../../store/songApi.slice';
import DetailsHeader from '../DetailHeader';
import PageNotFound from '../ErrorPage';
import { LoaderSong } from '../LoadingScreen/LoadingScreen';
import RelatedSongs from '../RelatedSongs';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <LoaderSong title="Loading artist details..." />;

  if (error) return <PageNotFound />;

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;