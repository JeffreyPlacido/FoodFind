import React from "react";
import sendGroceries from "./grocerybutton";
import sendFavorites from "./favoritesbutton";

const Recipe = ({ title, calories, image, ingredients, email }) => {
  console.log(ingredients, "INGREDIENTS");
  return (
    <div>
      <h1>{title}</h1>
      <img src={image} alt="" />
      <ol>
        {ingredients.map((ingredients, index) => (
          <li key={index + Math.floor(Math.random() * 10000000)}>
            {ingredients.text}
          </li>
        ))}
      </ol>
      <>
        <button
          onClick={() => {
            sendFavorites(title, ingredients, email);
          }}
        >
          add to favorites
        </button>
        <button
          onClick={() => {
            sendGroceries(title, ingredients, email);
          }}
        >
          add to groceries
        </button>
      </>
    </div>
  );
};

export default Recipe;
