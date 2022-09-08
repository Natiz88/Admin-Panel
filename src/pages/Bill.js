import React, { useState, useEffect, useRef } from "react";
// import './billtable.css'
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableContainer,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, FormsIcon } from "../icons";

const Bill = () => {
  const [tableAttributeData, setTableAttributeData] = useState([]);
  const ref = useRef();
  const print = () => {
    let el = ref.current.innerHTML;
    let org = document.body.innerHTML;
    document.body.innerHTML = el;
    window.print();
    document.body.innerHTML = org;
  };

  return (
    <div>
      <div>
        asda
        <h1>sdasd</h1>
        <p ref={ref} id="hell">
          hello
        </p>
      </div>
      <button onClick={print}>Print</button>
    </div>
  );
};

export default Bill;
