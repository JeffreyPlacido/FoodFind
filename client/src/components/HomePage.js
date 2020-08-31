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

  const [vegan, setVegan] = useState("");
  const [peanuts, setPeanuts] = useState("");
  const [vegetarian, setVegetarian] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}${vegan}${peanuts}${vegetarian}`
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

  const SelectVegan = (e) => {
    if (vegan === "") {
      setVegan("&health=vegan");
    } else {
      setVegan("");
    }
    console.log(vegan);
  };

  const SelectPeanuts = (e) => {
    if (peanuts === "") {
      setPeanuts("&health=peanut-free");
    } else {
      setPeanuts("");
    }
    console.log(peanuts);
  };

  const SelectVegetarian = (e) => {
    if (vegetarian === "") {
      setVegetarian("&health=vegetarian");
    } else {
      setVegetarian("");
    }
    console.log(vegetarian);
  };

  return appUser ? (
    <div>
      <NavBar />
      <Fbutton
        className="filter"
        type="toggle"
        style={{
          backgroundColor: vegan === "" ? "lightgreen" : "coral",
        }}
        onClick={() => {
          SelectVegan();
        }}
      >
        Vegan
      </Fbutton>
      <Fbutton
        className="filter"
        type="toggle"
        style={{
          backgroundColor: peanuts === "" ? "lightgreen" : "coral",
        }}
        onClick={() => {
          SelectPeanuts();
        }}
      >
        No Peanuts
      </Fbutton>
      <Fbutton
        className="filter"
        type="toggle"
        style={{
          backgroundColor: vegetarian === "" ? "lightgreen" : "coral",
        }}
        onClick={() => {
          SelectVegetarian();
        }}
      >
        Vegetarian
      </Fbutton>
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

const Fbutton = styled.button`
  padding: 10px;
  margin-left: 5vw;
  margin-top: 2vh;
  border-radius: 8px;
  width: 6vw;
  height: 4vh;
`;

const BoxBox = styled.div`
  padding: 15px;
`;

const FormButton = styled.div`
  height: 4vh;
  width: 25vw;
  z-index: 3;
  display: flex;
  margin-left: 7vw;
  margin-top: 4vh;
`;

const RecipeBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Input = styled.input`
  width: 15vw;
  border-radius: 4px;
  padding: 10px;
  height: 1vh;
`;

const SButton = styled.button`
  background: lightgreen;
  padding: 10px 20px;
  color: darkgreen;
  width: 8vw;
  border-radius: 4px;
  font-size: 1vh;
  &:hover {
    background-color: coral;
  }
`;
