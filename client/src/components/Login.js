import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { database } from "firebase";
import { useHistory } from "react-router-dom";
import appBG from "../assests/appBG.jpeg";
import styled from "styled-components";

function Login() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const { signInWithGoogle, handleSignOut, appUser, setAppUser } = useContext(
    AuthContext
  );
  const history = useHistory();

  function handleGoogleSignIn() {
    signInWithGoogle()
      .then((data) => {
        console.log(database);
        return fetch("/user", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
          }),
        });
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoggedIn(true);
      })
      .then((data) => history.push("/homepage"));
  }

  return (
    <Container>
      <Hero>
        <BG></BG>
        <Position>
          <Name>FoodFind</Name>
        </Position>
        <Button onClick={handleGoogleSignIn}> Sign In with Google</Button>
        <div id="firebaseui-auth-container"></div>
      </Hero>
    </Container>
  );
}

const Position = styled.div`
  position: absolute;
  top: 30%;
  left: 34%;
  font-size: 80px;
  color: darksalmon;
`;

const Button = styled.button`
  width: 15%;
  height: 3%;
  position: absolute;
  top: 55%;
  left: 39%;
  font-size: 20px;
`;

const Container = styled.div`
  left: 0;
  top: 0;
`;

const Hero = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const BG = styled.div`
  background: url(${appBG}) no-repeat;
  background-size: cover;
  margin-right: -1em;
  margin-left: -1em;
  width: 105%;
  height: 103%;
`;
const Name = styled.h1``;

export default Login;
