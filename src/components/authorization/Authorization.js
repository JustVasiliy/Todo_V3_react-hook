import React, { useContext } from "react";
import "../../../dist/css/style.css";
import { API } from "../../API/API.js";
import { url } from "../../../config";
import InputForm from "../InputForm";
import { useState } from "react";
import { getCookie } from "../../../config/getCookie";
import { TokenContext } from "../../service/context";
const api = new API(url);

function Authorization({token}) {
  
  const [dataAuth, setDataAuth] = useState({
    nickname: "",
    password: "",
  });
  async function handleFormSubmit() {
    const nickname = dataAuth.nickname;
    const password = dataAuth.password;

    if (nickname.trim() !== "" || password.trim() !== "") {
      const callAPI = await api.callAPI("api/authorization", "POST", "", {
        nickname: nickname.trim(),
        password: password.trim(),
      });

      document.cookie = `token=${await callAPI.text()}`;
      if (token === "You need registration!") {
        alert("User not found. May be, you need registration");
      } else {
        window.location.reload();
      }
    }
  }
  function getDataInput(value, nameInput) {
    if (nameInput === "nickname") {
      setDataAuth({ ...dataAuth, nickname: value });
    } else if (nameInput === "password") {
      setDataAuth({ ...dataAuth, password: value });
    }
  }

  return (
    <>
      <form
        className="Auth"
        onSubmit={(event) => {
          event.preventDefault();
        }}>
        <h2>Authorizatoin</h2>
        <InputForm
          type={"text"}
          placeholder={"Write your nickname"}
          forInput={"nickname"}
          labelText={"Nickname"}
          fun={getDataInput}
          style={"Auth"}
        />
        <InputForm
          type={"password"}
          placeholder={"Write your password"}
          forInput={"password"}
          labelText={"Password"}
          fun={getDataInput}
          style={"Auth"}
        />
        <button className="Auth" onClick={() => handleFormSubmit()}>
          Send
        </button>
      </form>
    </>
  );
}

export default Authorization;
