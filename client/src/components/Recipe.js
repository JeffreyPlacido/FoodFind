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
      <div>
        <a href={url}>Click to view Recipe</a>
      </div>
      <>
        <button
          onClick={() => {
            if (window.confirm("Add to Favorites?")) {
              sendFavorites(title, ingredients, email, dietLabels, url, image);
            }
          }}
        >
          add to favorites
        </button>
        <button
          onClick={() => {
            if (window.confirm("Add to Groceries?")) {
              sendGroceries(title, ingredients, email, dietLabels, url, image);
            }
          }}
        >
          add to groceries
        </button>
      </>
    </RecipeBox>
  );
};
const Title = styled.h1`
  color: Crimson;
`;

const RecipeBox = styled.div`
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 5px 5px grey;
  align-items: center;
  justify-content: space-around;
  padding: 15px;
  margin-top: 20vh;
  background: lightgreen;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 250px;
  width: 200px;
`;

const Li = styled.li`
  text-decoration: none;
  font-size: 18px;
  color: darkgreen;
`;

export default Recipe;
