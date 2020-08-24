import React, { useState } from "react";
import "./style.css";

function Card(props) {
  return (
    <tbody>
      <tr>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
        <td>{props.dob}</td>
      </tr>
    </tbody>
  );
}

export default Card;
