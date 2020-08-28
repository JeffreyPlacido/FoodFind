import React from "react";
import sendGroceries from "./grocerybutton";

export default function Favori({
  title,
  image,
  ingredients,
  email,
  dietLabels,
  url,
}) {
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
      <div>
        <a href={url}>Click to view Recipe</a>
      </div>
      <button>Remove from Favorites</button>
      <button
        onClick={() => {
          sendGroceries(title, ingredients, email, dietLabels, url, image);
        }}
      >
        Add to Groceries
      </button>
    </div>
  );
}
