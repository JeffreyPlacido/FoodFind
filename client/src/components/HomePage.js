import React, { useEffect, useState, useContext } from "react";
import Recipe from "./Recipe";
import appUser from "./AuthContext";
import { AuthContext } from "./AuthContext";
require("dotenv").config();

export default function HomePage() {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return appUser ? (
    <div>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Find Recipe
        </button>
      </form>
      {recipes.map((recipe, index) => {
        let theKey = index + Math.floor(Math.random() * 10000000);
        return (
          <Recipe
            key={theKey}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            email={appUser.email}
            dietLabels={recipe.recipe.dietLabels}
            url={recipe.recipe.url}
          />
        );
      })}
    </div>
  ) : (
    <div>loading</div>
  );
}
