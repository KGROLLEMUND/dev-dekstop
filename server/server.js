require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  console.log(process.env)
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })
  console.log(req.body.code)

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      // console.log(err)
      res.sendStatus(400)
    })
})

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
  res.json({ lyrics })
})

// app.post("/auth", (req, res) => {
//   const code = req.body.code;

//   const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     redirectUri: REDIRECT_URI,
//   });

//   //object to store all returned data from the api calls below
//   // const userJSON = {};

//   spotifyApi
//     .authorizationCodeGrant(code)
//     .then((data) => {
//       res.json({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in,
//       });
//     })
//     .catch((err) => {
//       // console.log(err)
//       res.sendStatus(400);

//       //retrieve the current user's info
//       // spotifyApi.setAccessToken(data.body['access_token']);
//       // return spotifyApi.getMe();
//     })
    // .then((data) => {
    //   userJSON["userId"] = data.body["id"];
    //   userJSON["name"] = data.body["display_name"];
    //   userJSON["email"] = data.body["email"];

    //   const image = data.body.images[0].url;
    //   userJSON["image"] = image;
    //   userJSON["product"] = data.body["product"];

    //   res.status(201).send(userJSON);
    // })
    // .catch((err) => {
    //   res.status(500).send(err);
    // });
// });

// app.post("/refresh", (req, res) => {
//   const refreshToken = req.body.refreshToken;

//   const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.REACT_APP_CLIENT_ID,
//     clientSecret: process.env.REACT_APP_CLIENT_SECRET,
//     redirectUri: REDIRECT_URI,
//     refreshToken,
//   });

//   spotifyApi
//     .refreshAccessToken()
//     .then((data) => {
//       console.log("The access token has been refreshed!");
//       res.status(201).json({
//         accessToken: data.body.access_token,
//         expires_in: data.body.expires_in,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send(err);
//     });
// });

// app.get("/lyrics/:artist/:title", async (req, res) => {
//   try {
//     const lyrics =
//       (await lyricsFinder(req.params.artist, req.params.title)) ||
//       "No Lyrics Found";
//     res.send(lyrics);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.post("/tracks", async (req, res) => {
//   try {
//     const spotifyApi = new SpotifyWebApi({
//       clientId: process.env.CLIENT_ID,
//     });
//     spotifyApi.setAccessToken(req.body.token);

//     const getTracks = await spotifyApi.searchTracks(req.body.searchTerm);
//     res.status(201).send(getTracks);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.listen(3001);
