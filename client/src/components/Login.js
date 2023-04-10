import React from "react";
// import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import logo from "../images/spotify-logo.png";
import styled from "styled-components";

const HomeContainer = styled.div`
  background-color: #363535;
`;

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiniContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 55vh;
  width: 30%;
  border-radius: 40px;
  background-color: #282828;
  @media (max-width: 900px) {
    width: 85%;
    height: 45vh;
  }
`;

const LoginText = styled.p`
  color: white;
  text-align: center;
  font-size: 3rem;
  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
`;

//&&& makes styled component styling an absolute priority
const LoginButton = styled(Button)`
  &&& {
    background-color: #43e23e;
    padding: 1rem 2rem 1rem 2rem;
    border-radius: 7%;
    margin-top: 1vh;
    &: hover {
      background-color: #18d860;
    }
  }
`;

// const scopes = [
//   'streaming',
//   'user-read-recently-played',
//   'user-read-playback-state',
//   'user-top-read',
//   'user-modify-playback-state',
//   'user-follow-read',
//   'user-library-read',
//   'user-library-modify',
//   'user-read-email',
//   'user-read-private'
// ];

// const AUTH_URL =
// `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=${scopes.join('%20')}`

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=f2589aed12dc496ca813d16428fbbcdc&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login(code) {
  const location = useLocation();
  const navigate = useNavigate();
  // // console.log(location.search.split("=")[1])
  useEffect(() => {
  // const code = location.search.split("=")[1];
  // localStorage.setItem("code", code);
    if (typeof code === "undefined") {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [location.search]);

  return (
    <HomeContainer>
      <LoginContainer>
        <MiniContainer>
          <img
            src={logo}
            alt="logo"
            style={{ height: "8rem", width: "8rem" }}
          />
          <LoginText>Explore Your Music Here!</LoginText>
          <LoginButton variant="contained">
            <a
              href={AUTH_URL}
              style={{ color: "white", textDecoration: "none" }}
            >
              Login spotify
            </a>
          </LoginButton>
        </MiniContainer>
      </LoginContainer>
    </HomeContainer>
  );
}