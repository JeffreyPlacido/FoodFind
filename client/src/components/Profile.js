import React, { useEffect, useState, useContext } from "react";
import appUser from "./AuthContext";
import { AuthContext } from "./AuthContext";
import Favori from "./Favori";

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
    <>
      {favorites.map((item, index) => {
        let favNum = index + Math.floor(Math.random() * 10000);
        return (
          <Favori
            key={favNum}
            title={item.ordernumber}
            image={item.image}
            ingredients={item.groceries}
            dietLabels={item.dietLabels}
            url={item.url}
          />
        );
      })}
    </>
  ) : (
    <div>loading</div>
  );
}
