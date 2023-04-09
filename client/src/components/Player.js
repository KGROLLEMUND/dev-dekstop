// import { useState, useEffect } from "react"
import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function Player({ accessToken, trackUri}) {
  // const [play, setPlay] = useState(false);

  // useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken || !trackUri) return null;

  return (
    // console.log("uri :", trackUri),
    console.log("token :", accessToken),
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      // callback={(state) => {
      //   if (!state.isPlaying) setPlay(false);
      // }}
      // play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
}

export default Player

