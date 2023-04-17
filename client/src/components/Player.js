import { useState, useEffect} from "react";
import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyPlayer from "react-spotify-web-playback";
import styled from "styled-components";

const spotifyApi = new SpotifyWebApi();

const MusicPlayerContainer = styled.div`
  position: fixed;
  width: 83%;
  bottom: 0%;
`;

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.getMyDevices().then((data) => {
        const device = data.devices.find((d) => d.type === "Computer");
        console.log(data)
        if (device) {
          setDeviceId(device.id);
          console.log("device id :", device.id);
        }
      });
    }
  }, [accessToken]);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken || !trackUri) return;

  return (
    console.log("uri :", trackUri),
    (
      // console.log("token :", accessToken),
      <>
        {deviceId && (
          <MusicPlayerContainer>
            <SpotifyPlayer
              token={accessToken}
              showSaveIcon
              callback={(state) => {
                if (!state.isPlaying) setPlay(false);
              }}
              play={play}
              uris={[trackUri]}
            />
          </MusicPlayerContainer>
        )}
      </>
    )
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
