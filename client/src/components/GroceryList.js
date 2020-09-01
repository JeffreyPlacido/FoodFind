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
  height: 500vh;
  background: url(${Bg}) repeat center center fixed;
  background-size: cover;
  background-attachment: fixed;
  position: absolute;
`;

const Recipe = styled.div`
  margin-top: 1vh;
  margin-bottom: 2vh;
  font-size: 3vh;
  display: flex;
  color: crimson;
  font-size: 3vh;
  padding: 10px;
  font-weight: bold;
  margin-left: 40vw;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const DButton = styled.button`
  margin-left: 10px;
  color: darkgreen;
  background: mintcream;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: coral;
  }
`;

const List = styled.div`
  margin-left: 40vw;
  margin-bottom: 4vh;
  padding: 4px;
  font-size: 2vh;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const Food = styled.div`
  padding-top: 4px;
`;
