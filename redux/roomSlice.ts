import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface room {
  type: String;
  roomName?: String;
  userName: String;
}

const initialState: room = {
  type: "",
  roomName: "",
  userName: "",
};

export const roomInfo = createSlice({
  name: "roomInfo",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<room>) => {
      state.type = action.payload.type;
      state.roomName = action.payload.roomName;
      state.userName = action.payload.userName;
    },
    setRoomName: (state, action: PayloadAction<String>) => {
      state.roomName = action.payload;
    },
  },
});

export const { setRoom, setRoomName } = roomInfo.actions;
export default roomInfo.reducer;
