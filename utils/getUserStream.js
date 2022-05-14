const constraints = {
  video: true,
  audio: true,
};

const userStream = (type) => {
  if (type == "camera") {
    return navigator.mediaDevices.getUserMedia(constraints);
  } else if (type == "screen") {
    return navigator.mediaDevices.getDisplayMedia(constraints);
  }
};

const mute = () => {
  constraints.audio = false;
};

export { userStream, mute };
