import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../types";

interface InitialStateProps {
	currentSongKey: string | null;
	songs: Song[];
}

const initialState: InitialStateProps = {
	currentSongKey: null,
	songs: [],
};

export const songSlice = createSlice({
	name: "song",
	initialState,
	reducers: {
		deleteSong: (state, action: PayloadAction<string>) => {
			state.songs = state.songs.filter((song) => song.key !== action.payload);
			if (state.currentSongKey === action.payload) {
				state.currentSongKey = null;
			}
		},
		setSongKey: (state, action: PayloadAction<string>) => {
			state.currentSongKey = action.payload;
		},
		setSongs: (state, action: PayloadAction<Song[]>) => {
			state.songs = action.payload;
		},
		addSongs: (state, action: PayloadAction<Song>) => {
			state.songs = [...state.songs, action.payload];
		},
		updateSong: (state, action: PayloadAction<Song>) => {
			
			const Keyx = state.songs.findIndex(
				(song) => song.key === action.payload.key
			);

			if (Keyx === -1) {
				return;
			}
			const songs = [...state.songs];
			
			songs[Keyx] = action.payload ;
			
			state.songs = [...songs];
			
		},
	},
});

export const { setSongs, addSongs, updateSong, setSongKey, deleteSong } =
	songSlice.actions;
export default songSlice.reducer;
