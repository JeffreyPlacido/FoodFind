import React from "react";
import sendGroceries from "./grocerybutton";
import sendFavorites from "./favoritesbutton";
import styled from "styled-components";

const Recipe = ({ title, image, ingredients, email, dietLabels, url }) => {
  return (
    <RecipeBox>
      <Title>{title}</Title>
      <Img src={image} alt="" />
      <ol>
        {ingredients.map((ingredients, index) => (
          <Li key={index + Math.floor(Math.random() * 10000000)}>
            {ingredients.text}
          </Li>
        ))}
      </ol>
      <URL>
        <a href={url}>Click to view Recipe</a>
      </URL>
      <>
        <Button
          onClick={() => {
            sendFavorites(title, ingredients, email, dietLabels, url, image);
          }}
        >
          add to favorites
        </Button>
        <Button
          onClick={() => {
            if (window.confirm("Add to Groceries?")) {
              sendGroceries(title, ingredients, email, dietLabels, url, image);
            }
          }}
        >
          add to groceries
        </Button>
      </>
    </RecipeBox>
  );
};

const Title = styled.h1`
  color: Crimson;
  padding: 5px;
`;

const URL = styled.div`
  padding: 10px;
  a {
    color: coral;
  }
`;

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
    background: coral;
  }
`;

const RecipeBox = styled.div`
  border-radius: 10px;
  box-shadow: 0px 5px 5px grey;
  padding: 25px;
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  margin-left: 2vw;
  margin-right: 2vw;
  width: 400px;
  margin-bottom: 5vh;
  text-align: center;
`;

const Img = styled.img`
  border-radius: 50%;
  padding: 5px;
  height: 250px;
  width: 200px;
`;

const Li = styled.li`
  text-decoration: none;
  font-size: 18px;
  color: darkgreen;
  padding: 5px;
  list-style-type: none;
`;

export default Recipe;
