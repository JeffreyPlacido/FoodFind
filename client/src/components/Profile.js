import React, { useEffect, useState, useContext } from "react";
import appUser from "./AuthContext";
import { AuthContext } from "./AuthContext";

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
      {favorites.map((item) => (
        <div>{item.ordernumber}</div>
      ))}
      {favorites.map((item) => (
        <>
          {item.groceries.map((groceries) => (
            <div>{groceries.text}</div>
          ))}
        </>
      ))}
    </>
  ) : (
    <div>loading</div>
  );
}
