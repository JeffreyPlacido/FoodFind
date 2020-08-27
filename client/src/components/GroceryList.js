import React, { useEffect, useState, useContext } from "react";
import appUser from "./AuthContext";
import { AuthContext } from "./AuthContext";

export default function Profile() {
  const { appUser } = useContext(AuthContext);
  const [list, setList] = useState([]);

  function getUserList() {
    if (appUser) {
      fetch("/usergroceries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: appUser.email,
        }),
      })
        .then((response) => response.json())
        .then((json) => setList(json.data));
    }
  }

  useEffect(() => {
    getUserList();
  }, [appUser]);

  return appUser ? (
    <>
      {list.map((item) => (
        <div>{item.ordernumber}</div>
      ))}
      {list.map((item) => (
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
