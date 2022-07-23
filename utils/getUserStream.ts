interface streamConstraints {
  video: boolean;
  audio: boolean;
}

const userStream = (constraints: streamConstraints, type?: string) => {
  if (type == "screen") {
    return navigator.mediaDevices.getDisplayMedia(constraints);
  } else {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
};

export { userStream };
