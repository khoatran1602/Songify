import axios from "axios";
import { songAPIEndpoint } from "../config";
import { useAppSelector } from "../store/hooks";

export type SongType = "Song"

export interface Song {
  artists: Artist[];
  images: Images;
  key: string;
  subtitle: string;
  title: string;
}

export interface Songs {
  adamid: string;
  coverart: string;
  key: string;
  subtitle: string;
  title: string;
}

export interface Artist {
  adamid: string;
  alias: string;
  id: string;
}

export interface Images {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}

export interface AxiosBaseQueryError {
	status: number;
	data: {
		code: number;
		msg: string;
		data?: any;
	};
}

export interface AppUser {
	id: string;
	displayName: string | null;
	email: string | null;
	photoUrl: string | null;
}

export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];


// export const getSongs = async (userId: string | undefined) => {
//   const { data } = await axios.get(songAPIEndpoint, {
//     params: { userId: userId },
//   });
//   return data;
// };
