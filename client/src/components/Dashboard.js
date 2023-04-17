import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
// import MusicPlayer from "./MusicPlayer";
import TrackSearchResult from "./TrackSearchResult";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
// import Playlist from "./Playlist";
// import { useLocation } from "react-router-dom";
import styled from "styled-components";

const MainContentContainer = styled.div`
  width: 83%;
  // grid-area: main;
`;

const SearchInput = styled(Form.Control)`
  type: search;
`;

const ScrollableContainer = styled.div`
  flex-grow: 1;
  margin-top: 2rem;
  overflow-y: auto;
`;

const NoResultsContainer = styled.div`
  text-align: center;
  white-space: pre;
`;

const spotifyApi = new SpotifyWebApi({
  clientId: "f2589aed12dc496ca813d16428fbbcdc",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [playingTrack, setPlayingTrack] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [lyrics, setLyrics] = useState("");
  // const [playlistId, setPlaylistId] = useState("");
  // const [playlistName, setPlaylistName] = useState("");

  // const location = useLocation();

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    // console.log("tokenInspotify", accessToken);
    spotifyApi.setAccessToken(accessToken);
    // console.log("pushtoken", spotifyApi.getAccessToken());
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    // console.log("parti dashboard"),
    // console.log("accessToken", accessToken),
    // console.log("useAuth(code)", useAuth(code)),
    // console.log("code", code),
    // console.log("playingTrack dashboard :", playingTrack),
    (
      <MainContentContainer>
        <a className="btn btn-success btn-lg" href="/">
          Login
        </a>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Songs/Artists"
        />

        <ScrollableContainer>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
          {searchResults.length === 0 && (
            <NoResultsContainer>{lyrics}</NoResultsContainer>
          )}
        </ScrollableContainer>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </MainContentContainer>
    )
  );
}
