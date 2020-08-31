import React, { useEffect, useState, useContext } from "react";
import appUser from "./AuthContext";
import { AuthContext } from "./AuthContext";
import NavBar from "./Navbar";
import deleteGrocery from "./deleteGroceryHelper";
import styled from "styled-components";
import BG from "../assests/404BG.jpg";

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
      <NavBar></NavBar>
      {list.map((item) => (
        <Recipe>{item.ordernumber}</Recipe>
      ))}
      {list.map((item) => (
        <List>
          {item.groceries.map((groceries) => (
            <Food>{groceries.text}</Food>
          ))}
          <DButton>Remove</DButton>
        </List>
      ))}
    </>
  ) : (
    <div>loading</div>
  );
}

const Recipe = styled.div``;

const DButton = styled.button``;

const List = styled.div`
  padding: 4px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const Food = styled.div`
  padding-top: 4px;
`;
