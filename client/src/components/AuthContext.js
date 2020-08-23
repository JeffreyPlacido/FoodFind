import React, { createContext, useEffect, useState } from "react";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AuthContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyC_TLe4fK6mN6tzgqbqBvikooJoQN7ynzE",
  authDomain: "foodfind-c837f.firebaseapp.com",
  databaseURL: "https://foodfind-c837f.firebaseio.com",
  projectId: "foodfind-c837f",
  storageBucket: "foodfind-c837f.appspot.com",
  messagingSenderId: "698893509230",
  appId: "1:698893509230:web:9459f9cc6ee477eb363c7f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

function createUserWithEmail(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function signInWithEmail(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

const AuthProvider = ({ children, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState("");

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = () => {
    return firebase.auth().signInWithPopup(googleProvider);
  };

  //   useEffect(() => {
  //     if (user) {
  //       fetch("/users", {
  //         method: "post",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: user.email,
  //           amountDue: "$15",
  //         }),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setAppUser(data.data);
  //           setMessage(data.message);
  //         });
  //     }
  //   }, [user]);

  return (
    <AuthContext.Provider
      value={{
        appUser,
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        handleSignOut,

        message,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(AuthProvider);
