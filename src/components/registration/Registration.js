import React from "react";
import InputForm from "../InputForm";
import "../../../dist/css/style.css";
import { API } from "../../API/API";
import { url } from "../../../config/index.js";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
const api = new API(url);

function Registration () {
  
  const [stateReg, setStateReg] = useState({
    name: "",
    surname: "",
    nickname: "",
    password: "",
  })
  async function handleFormSubmit () {
    const name = stateReg.name;
    const surname = stateReg.surname;
    const nickname = stateReg.nickname;
    const password = stateReg.password;
    
    if (
      name.trim() !== "" ||
      surname.trim() !== "" ||
      nickname.trim() !== "" ||
      password.trim() !== ""
    ) {
      const call = await api.callAPI("api/registration", "POST", "123", {
        name: name.trim(),
        surname: surname.trim(),
        nickname: nickname.trim(),
        password: password.trim(),
        id: uuidv4(),
      });
      document.cookie = `token=${await call.text()}`;
    } else {
      alert("Invalid data. Try another entry.");
    }
    if (document.cookie === "token=This nickname already exists") {
      alert("This nickname already exists. Change it.");
    } else {
      window.location.reload();
    }
  };
  function getInputData (value, nameInput) {
    if (nameInput === "name") {
      setStateReg({...stateReg, name:value });
    } else if (nameInput === "surname") {
      setStateReg({ ...stateReg, surname: value });
    } else if (nameInput === "nickname") {
      setStateReg({ ...stateReg, nickname: value });
    } else if (nameInput === "password") {
      setStateReg({ ...stateReg, password: value });
    }
    
  };
  
    return (
      <>
        <form
          className="Registr"
          onSubmit={function (event) {
            event.preventDefault();
          }}>
          <h2>Registration</h2>
          <InputForm
            labelText={"Name"}
            placeholder={"Write your name"}
            forInput={"name"}
            type={"text"}
            style={"Registr"}
            fun={getInputData}
          />
          <InputForm
            labelText={"Surname"}
            placeholder={"Write your surname"}
            forInput={"surname"}
            type={"text"}
            style={"Registr"}
            fun={getInputData}
          />
          <InputForm
            labelText={"Nickname"}
            placeholder={"Write your nickname"}
            forInput={"nickname"}
            type={"text"}
            style={"Registr"}
            fun={getInputData}
          />
          <InputForm
            labelText={"Password"}
            placeholder={"Write your password"}
            forInput={"password"}
            type={"password"}
            style={"Registr"}
            fun={getInputData}
          />
          <button className="Registr" onClick={()=>handleFormSubmit()}>
            Send
          </button>
        </form>
      </>
    );
  
}

export default Registration;
