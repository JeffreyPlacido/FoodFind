import React, { useEffect, useState, useContext } from "react";
import appUser from "./AuthContext";
import { AuthContext } from "./AuthContext";
import Favori from "./Favori";
import NavBar from "./Navbar";
import styled from "styled-components";
import Hp from "../assests/HP.jpg";

export default function Profile() {
  const { appUser } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  function getUserFavorites() {
    if (appUser) {
      fetch("/userfavorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: appUser.email,
        }),
      })
        .then((response) => response.json())
        .then((json) => setFavorites(json.data));
    }
  }
  console.log(favorites);
  useEffect(() => {
    getUserFavorites();
    console.log(favorites);
  }, [appUser]);

  return appUser ? (
    <BG>
      <NavBar></NavBar>
      <Fix>
        {favorites.map((item, index) => {
          let favNum = index + Math.floor(Math.random() * 10000);
          return (
            <FavBox>
              <Favori
                key={favNum}
                title={item.ordernumber}
                email={appUser.email}
                image={item.image}
                ingredients={item.groceries}
                dietLabels={item.dietLabels}
                url={item.url}
              />
            </FavBox>
          );
        })}
      </Fix>
    </BG>
  ) : (
    <div>loading</div>
  );
}

const BG = styled.div`
  background: url(${Hp}) repeat center center fixed;
  background-size: cover;
  background-attachment: fixed;
  position: absolute;
`;

const Fix = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 8vh;
`;

const FavBox = styled.div``;
