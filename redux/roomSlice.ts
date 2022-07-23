import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface room {
  roomName: String;
  userName: String;
}

const initialState: room = {
  roomName: "",
  userName: "",
};

export const roomInfo = createSlice({
  name: "roomInfo",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<room>) => {
      state.roomName = action.payload.roomName;
      state.userName = action.payload.userName;
    },
  },
});

export const { setRoom } = roomInfo.actions;
export default roomInfo.reducer;
