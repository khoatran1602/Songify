import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { songAPIEndpoint } from "../config";
import { Artist, Song } from "../types";

export const ShazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "f403423868mshb6323e6233957a9p128b3cjsn8ea8c8d16bb3"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query<Artist | any, void>({
      query: () => `/charts/world`,
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `/charts/genre-world?genre_code=${genre}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/details?artist_id=${artistId}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `/tracks/related?track_id=${songid}`,
    }),
  }),
});

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: songAPIEndpoint, method, data, params });
      return {
        data: result.data.data,
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status || 400,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const songApi = createApi({
  reducerPath: "songAPI",
  baseQuery: axiosBaseQuery({ baseUrl: songAPIEndpoint }),
  tagTypes: ["Song"],
  endpoints: (builder) => ({
    getSong: builder.query<Song, { songId: string; userId: string }>({
      query: ({ songId, userId }) => ({
        url: songId,
        method: "GET",
        params: {
          userId: userId,
        },
      }),
      providesTags: (result, error, arg) =>
				result ? [{ type: "Song" as const, id: result.key }, "Song"] : ["Song"],
    }),
    getSongs: builder.query<Song[], string>({
      query: (userId) => ({
        url: "",
        method: "GET",
        params: {
          userId: userId,
        },
      }),
      providesTags: (result, error, arg) =>
				result
					? [...result.map(({ key }) => ({ type: "Song" as const, key })), "Song"]
					: ["Song"],
    }),
    updateSong: builder.mutation<void, Song>({
			query: (song) => ({
				url: "",
				method: "PUT",
				data: song,
			}),
			invalidatesTags: ["Song"],
		}),
    deleteSong: builder.mutation<
      void,
      { songId: string; userId: string; idOfRequestingUser: string }
    >({
      query: (params) => {
        return {
          url: "",
          method: "DELETE",
          params: { userId: params.idOfRequestingUser },
          data: { id: params.songId, userId: params.userId },
        };
      },
    }),
    addSong: builder.mutation<Song, Song>({
      query: (song) => ({
        url: "",
        method: "POST",
        data: song,
      }),
    }),
  }),
});



export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = ShazamApi;

export const {
  useGetSongQuery,
  useGetSongsQuery,
  useAddSongMutation,
  useDeleteSongMutation,
} = songApi;

// try {
//   const response = await fetch(
//     "https://shazam-core.p.rapidapi.com/v1/charts/world",
//     {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": "da6b89022dmsh391f5b272bd01c6p1b4bd7jsn09aab599bde4",
//         "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
//       },
//     }
//   );

//   if (response.ok) {
//     const result = await response.json();
//     console.log(result);
//   }
// } catch (err) {
//   console.error(err);
// }
