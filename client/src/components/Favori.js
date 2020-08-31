import React from "react";
import sendGroceries from "./grocerybutton";
import deleteFavorite from "./deletefavoritehelper";
import appUser from "./AuthContext";
import { AuthContext } from "./AuthContext";
import { confirmAlert } from "react-confirm-alert";

import styled from "styled-components";

export default function Favori({
  title,
  image,
  ingredients,
  email,
  dietLabels,
  url,
}) {
  return (
    <Fav>
      <H1>{title}</H1>
      <Img src={image} alt="" />
      <ol>
        {ingredients.map((ingredients, index) => (
          <Li key={index + Math.floor(Math.random() * 10000000)}>
            {ingredients.text}
          </Li>
        ))}
      </ol>
      <Link>
        <a href={url}>Click to view Recipe</a>
      </Link>
      <Button
        onClick={() => {
          if (window.confirm("Remove from Favorites?")) {
            deleteFavorite(title, ingredients, email, dietLabels, url, image);
          }
        }}
      >
        Remove from Favorites
      </Button>
      <Button
        onClick={() => {
          if (window.confirm("Add to Groceries?")) {
            sendGroceries(title, ingredients, email, dietLabels, url, image);
          }
        }}
      >
        Add to Groceries
      </Button>
    </Fav>
  );
}

const Button = styled.button`
  width: 10vw;
  height: 4vh;
  padding: 4px;
  color: darkgreen;
  background: mintcream;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: lightgreen;
  }
`;

const Link = styled.div`
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  a {
    text-decoration: none;
    color: coral;
  }
  &:hover {
    background: darkgreen;
    border-radius: 10px;
  }
`;

const Li = styled.li`
  list-style-type: none;
  font-size: 18px;
  color: darkgreen;
  padding: 2px;
  font-weight: bold;
`;

const H1 = styled.h1`
  color: darkgreen;
`;

const Img = styled.img`
  border-radius: 50%;
`;

const Fav = styled.div`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 5px 5px grey;
  align-items: center;
  justify-content: space-around;
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  width: 18vw;
  margin-top: 2vh;
  margin-bottom: 1vh;
  margin-right: 1vw;
  margin-left: 1vw;
  padding: 5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
