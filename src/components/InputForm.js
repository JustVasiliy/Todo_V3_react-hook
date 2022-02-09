import React, { useRef, useState } from "react";
import "../../dist/css/style.css";

function InputForm ({placeholder, name, type, labelText, fun, forInput, style}){
  const [dataInput, setDataInput] = useState({
    inputValue: ''
});

  const inputRef = useRef('')
  function setInputValue (e){
    const {value} = e.target;
   
    setDataInput((prevState) => {
      const newState = {
        inputValue: value,
      };
      fun(newState.inputValue, inputRef.current.name);
      return newState;
    });
   
    
  }
  
  return (
    <>
    <label className={style}>{labelText} </label>
    <input
      className={style}
      id={forInput}
      placeholder={placeholder}
      name={forInput}
      type={type}
      required
      ref={inputRef}
      onChange={setInputValue}
    ></input>
  </>
  )
}


export default InputForm;
