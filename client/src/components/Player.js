import { useState, useEffect } from "react";
import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import styled from "styled-components";

const MusicPlayerContainer = styled.div`
  position: fixed;
  width: 83%;
  bottom: 0%;
`;

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken || !trackUri) return null;

  return (
    // console.log("uri :", trackUri),
    // console.log("token :", accessToken),
    <>
      <MusicPlayerContainer>
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          // callback={(state) => {
          //   if (!state.isPlaying) setPlay(false);
          // }}
          play={play}
          uris={trackUri ? [trackUri] : []}
        />
      </MusicPlayerContainer>
    </>
    // if (!accessToken) return null;
    // return (
    //   console.log("token :", accessToken),
    //   console.log("uri :", trackUri),
    //   <>
    //       <MusicPlayerContainer>
    //         <SpotifyPlayer
    //           token={accessToken}
    //           showSaveIcon
    //           callback={(state) => {
    //             if (!state.isPlaying) setPlay(false);
    //           }}
    //           play={play}
    //           uris={trackUri}
    //           magnifySliderOnHover
    //           persistDeviceSelection
    //           styles={{
    //             sliderColor: "#1cb954",
    //           }}
    //         />
    //       </MusicPlayerContainer>
    //   </>
    // // console.log("uri :", trackUri),
    // console.log("token :", accessToken),
    // <SpotifyPlayer
    //   token={accessToken}
    //   showSaveIcon
    //   // callback={(state) => {
    //   //   if (!state.isPlaying) setPlay(false);
    //   // }}
    //   // play={play}
    //   uris={trackUri ? [trackUri] : []}
    // />
  );
}
