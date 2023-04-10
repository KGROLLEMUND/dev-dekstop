// import { useState, useEffect } from "react";
// import { Form, Button } from "react-bootstrap";
// import SpotifyWebApi from "spotify-web-api-node";
// import styled from "styled-components";

// const PlaylistContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 2rem;
// `;

// const PlaylistTitle = styled.h2`
//   font-size: 2rem;
//   margin-bottom: 1rem;
// `;

// const PlaylistForm = styled(Form)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const PlaylistInput = styled(Form.Control)`
//   width: 100%;
//   margin-bottom: 0.5rem;
// `;

// const PlaylistButton = styled(Button)`
//   width: 50%;
// `;

// const spotifyApi = new SpotifyWebApi({
//   clientId: "f2589aed12dc496ca813d16428fbbcdc",
// });

// export default function Playlist({ accessToken }) {
//   const [playlists, setPlaylists] = useState([]);
//   const [selectedPlaylist, setSelectedPlaylist] = useState("");
//   const [trackUri, setTrackUri] = useState("");
//   const [playlistName, setPlaylistName] = useState("");
//   const [playlistId, setPlaylistId] = useState("");

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//     spotifyApi.getUserPlaylists().then((res) => {
//       setPlaylists(res.body.items);
//     });
//   }, [accessToken]);

//   function createPlaylist() {
//     if (!accessToken) return;
//     spotifyApi
//       .createPlaylist(playlistName, {
//         description: "Created with My Spotify App",
//         public: false,
//       })
//       .then((playlist) => {
//         console.log("Playlist created!");
//         console.log(playlist);
//         setPlaylistId(playlist.body.id);
//         setPlaylistName("");
//       })
//       .catch((err) => {
//         console.error("Error creating playlist: ", err);
//       });
//   }

//   function handlePlaylistChange(e) {
//     setSelectedPlaylist(e.target.value);
//   }

//   function handleTrackChange(e) {
//     setTrackUri(e.target.value);
//   }

//   function handleAddTrack(e) {
//     e.preventDefault();
//     if (!selectedPlaylist || !trackUri) return;
//     spotifyApi.addTracksToPlaylist(selectedPlaylist, [trackUri]).then(() => {
//       alert("Track added to playlist successfully!");
//       setSelectedPlaylist("");
//       setTrackUri("");
//     });
//   }

//   return (
//     <PlaylistContainer>
//       <PlaylistTitle>Add to Playlist</PlaylistTitle>
//       <PlaylistForm onSubmit={handleAddTrack}>
//         <PlaylistInput
//           as="select"
//           value={selectedPlaylist}
//           onChange={handlePlaylistChange}
//         >
//           <option value="">Select a Playlist</option>
//           {playlists.map((playlist) => (
//             <option key={playlist.id} value={playlist.id}>
//               {playlist.name}
//             </option>
//           ))}
//         </PlaylistInput>
//         <PlaylistInput
//           type="text"
//           placeholder="Enter Track URI"
//           value={trackUri}
//           onChange={handleTrackChange}
//         />
//         <PlaylistButton type="submit">Add Track</PlaylistButton>
//       </PlaylistForm>
//     </PlaylistContainer>
//   );
// }
