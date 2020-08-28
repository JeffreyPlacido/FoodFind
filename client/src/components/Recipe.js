import React from "react";
import sendGroceries from "./grocerybutton";
import sendFavorites from "./favoritesbutton";

const Recipe = ({ title, image, ingredients, email, dietLabels, url }) => {
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
            sendFavorites(title, ingredients, email, dietLabels, url, image);
          }}
        >
          add to favorites
        </button>
        <button
          onClick={() => {
            sendGroceries(title, ingredients, email, dietLabels, url, image);
          }}
        >
          add to groceries
        </button>
      </>
    </div>
  );
};

export default Recipe;
