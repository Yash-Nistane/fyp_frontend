import React, {useState} from "react";
import './CustomInput.scss'

// const {
//   title,
//   description,
//   amountToRaise,
//   deadlineToBid,
//   deadlineOfProject,
//   minAmountToRelease,
//   minAmountToFund,
//   maxEquityToDilute,

//   imageURL,
//   projectBuildersRequired,


// } = req.body;

export default function CustomInput(props) {

  return (
    <div className="form">
      <input
        type={props.type}
        id={props.id}
        className="form__input"
        autoComplete="off"
        placeholder=" "
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        max={props.max}
        
      />
      <label htmlFor={props.id} className="form__label">
        {props.label}
      </label>
    </div>
  );
}
