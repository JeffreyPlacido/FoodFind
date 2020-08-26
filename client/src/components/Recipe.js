import React from "react";

const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{calories}</p>
      <img src={image} alt="" />
      <ol>
        {ingredients.map((ingredients, index) => (
          <li key={index + Math.floor(Math.random() * 10000000)}>
            {ingredients.text}
          </li>
        ))}
      </ol>
      <>
        <button>add to favorites</button>
        <button>add to groceries</button>
      </>
    </div>
  );
};

export default Recipe;
