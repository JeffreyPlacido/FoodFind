import React, { useEffect, useState, useContext } from "react";
import appUser from "./AuthContext";
import { AuthContext } from "./AuthContext";
import NavBar from "./Navbar";
import deleteGrocery from "./deleteGroceryHelper";
import styled from "styled-components";
import Bg from "../assests/404BG.jpg";

export default function Profile({
  title,
  image,
  ordernumber,
  ingredients,
  email,
  dietLabels,
  url,
}) {
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
      <BGP>
        <NavBar></NavBar>
        {list.map((item) => (
          <Recipe>
            {item.ordernumber}
            <DButton
              onClick={() => {
                deleteGrocery(item);
              }}
            >
              Remove
            </DButton>
          </Recipe>
        ))}
        {list.map((item) => (
          <List>
            {item.groceries.map((groceries) => (
              <Food>{groceries.text}</Food>
            ))}
          </List>
        ))}
      </BGP>
    </>
  ) : (
    <div>loading</div>
  );
}
const BGP = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${Bg}) repeat center center fixed;
  background-size: cover;
  background-attachment: fixed;
  position: absolute;
`;

const Recipe = styled.div`
  display: flex;
  color: darkgreen;
  font-size: 25px;
  padding: 3px;
  font-weight: bold;
  margin-left: 40vw;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const DButton = styled.button`
  cursor: pointer;
  margin-left: 20px;
`;

const List = styled.div`
  margin-left: 40vw;
  padding: 4px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const Food = styled.div`
  padding-top: 4px;
`;
