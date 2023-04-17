import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import styled from 'styled-components';


const MusicPlayerContainer = styled.div`
  position: fixed;
  width: 83%;
  bottom: 0%;
`;

const MusicPlayer= ({token, songUri}) => {

  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true)
  },[songUri])

  return(
    <>
    {token &&
    <MusicPlayerContainer>
        <SpotifyPlayer
          token = {token}
          uris = {songUri}
          initialVolume = {0.5}
          callback = {state => {
            if (!state.isPlaying) setPlay(false)
          }}
          play = {play}
          showSaveIcon
          magnifySliderOnHover
          persistDeviceSelection
          styles = {{
            // activeColor: '#fff',
            // color: '#fff',
            // bgColor: '#333',
            sliderColor: '#1cb954'
          }}
        />
        </MusicPlayerContainer>
      }
    </>
  )
}

export default MusicPlayer;