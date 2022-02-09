import React from "react";
import Authorization from "./components/authorization/Authorization";
import Registration from "./components/registration/Registration";
import MainForm from "./components/todo/MainForm";
import RegistrOrAuth from "./components/RegistrOrAuth";
import { getCookie } from "../config/getCookie.js";
import { useState, useEffect, useContext } from "react";
import {  TokenContext } from "./service/context";
function App() {
 
  const [token, setToken] = useState({ token: "" });
  
  function getTokenFromСhildComponent(token) {
    setToken({ token: token});
  }

  useEffect(() => {
    setToken({ token: getCookie("token") });
  }, []);
  console.log(token)
  if (
    token.token === "Invalid token" ||
    token.token === "" ||
    token.token === undefined ||
    token.token === "error"
  ) {
    return <RegistrOrAuth token={token.token} />;
  } else if (token.token === "registration") {
    return <Registration token={token.token} />;
  } else if (token.token === "authorization") {
    return <Authorization token={token.token} />;
  } else {
    return (
      <TokenContext.Provider value = {{
        token: token.token,
        getToken: getTokenFromСhildComponent,
      }}>
        
        <MainForm
          // token={token.token}
          // getToken={() => getTokenFromСhildComponent}
        />
      </TokenContext.Provider>
    );
  }
}

export default App;
