import { createSlice } from "@reduxjs/toolkit";

interface streamConstraints {
  video: boolean;
  audio: boolean;
}

const initialState: streamConstraints = {
  audio: true,
  video: true,
};

export const mediaConstraints = createSlice({
  name: "mediaConstraints",
  initialState,
  reducers: {
    toggleAudioStream: (state) => {
      state.audio = state.audio ? false : true;
    },
    toggleVideoStream: (state) => {
      state.video = state.video ? false : true;
    },
  },
});

export const { toggleAudioStream, toggleVideoStream } =
  mediaConstraints.actions;
export default mediaConstraints.reducer;
