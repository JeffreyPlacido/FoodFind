import React, { useEffect, useState, useContext } from "react";
import Recipe from "./Recipe";
import appUser from "./AuthContext";
import { AuthContext } from "./AuthContext";
import NavBar from "./Navbar";
import styled from "styled-components";
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
      <NavBar />
      <FormButton>
        <form onSubmit={getSearch} className="search-form">
          <Input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <SButton className="search-button" type="submit">
            Find Recipe
          </SButton>
        </form>
      </FormButton>
      {recipes.map((recipe, index) => {
        let theKey = index + Math.floor(Math.random() * 10000000);
        return (
          <BoxBox>
            <Recipe
              key={theKey}
              title={recipe.recipe.label}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              email={appUser.email}
              dietLabels={recipe.recipe.dietLabels}
              url={recipe.recipe.url}
            />
          </BoxBox>
        );
      })}
    </div>
  ) : (
    <div>loading</div>
  );
}

const BoxBox = styled.div`
  padding: 15px;
  display: inline-block;
  width: 100vw;
  height: 100vh;
`;

const FormButton = styled.div`
  height: 4vh;
  width: 25vw;
  z-index: 3;
  display: flex;
  position: absolute;
  margin-left: 15vw;
  margin-top: 15vh;
`;

const RecipeBox = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Input = styled.input`
  width: 15vw;

  padding: 10px;
  height: 1vh;
`;

const SButton = styled.button`
  background: lightgreen;

  padding: 10px 20px;
  color: darkgreen;
  width: 8vw;
  font-size: 1vh;
  &:hover {
    background-color: coral;
  }
`;
