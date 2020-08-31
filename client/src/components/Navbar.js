import React from "react";
import styled from "styled-components";

export default function Navbar() {
  return (
    <NavBar>
      <Div>
        <a href="/homepage">Home</a>
      </Div>
      <Divtwo>
        <a href="/profile">Favorites</a>
      </Divtwo>
      <Divthree>
        <a href="/grocerylist">Groceries</a>
      </Divthree>
      <Out>
        <a href="/">Sign Out</a>
      </Out>
    </NavBar>
  );
}

const NavBar = styled.nav`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  display: grid;
  grid-template-columns: 6% 8% 8% 1fr;
  position: absolute;
  width: 100vw;
  min-height: 7vh;
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  color: darkgreen;
  font-size: 25px;
  align-items: center;
  a {
    color: darkgreen;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;

    display: inline-block;
    padding: 15px 20px;
    position: relative;
  }
  a:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: darkgreen;
    transition: width 0.5s ease 0s, left 0.5s ease 0s;
    width: 0;
  }
  a:hover:after {
    width: 100%;
    left: 0;
  }
`;

const Div = styled.div`
  margin-left: 5vh;
  text-decoration: none;
`;

const Divtwo = styled.div`
  margin-left: 10vh;
  text-decoration: none;
`;

const Divthree = styled.div`
  margin-left: 15vh;
  text-decoration: none;
`;

const Out = styled.div`
  margin-left: 25;
  margin-right: 5vh;
  justify-self: end;
`;
