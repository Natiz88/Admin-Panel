import React,{useState} from "react";
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

  return (
    <div className="w-screen h-[1200px] bg-blue-400">
      <div className="w-1/2 h-full bg-green-400">
      <div className="flex justify-between h-12 w-full">
        <div>Date:</div>
        <img src="" alt="Logo" className="flex self-end" />
      </div>
      <div>
        <div>
          <h1 className="mb-2 font-medium text-xl ">Order Slip</h1>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div>
                <p>Bill No.:</p>
                <p>Payment:</p>
              </div>
              <div>
                <p>Date:</p>
                <p>Order ID:</p>
              </div>
              <div>
                <p>Name:</p>
                <p>Address:</p>
              </div>
            </div>
            <img src="" alt="Product Img" />
          </div>
        </div>
        <div>
          {/* <TableContainer className="mb-8 mt-6"> */}
            <table>
              <tr>
                  <th>S.N</th>
                  <th>Particulars</th>
                  <th>Qty.</th>
                  <th>Rate</th>
                  <th>Amount(Rs.)</th>
              </tr>
              <tr>
                  <td>1</td>
                  <td >
                    <tr>
                      <div className="tb">
                    <p>Business card asdaj asdakjas asia</p>
                    <p>Discount: 200</p>
                    <p>Shipping cost</p>
                  </div>
                    </tr>
                    <tr><div className="tb"><p>transpotrt sk </p>
                    <p>136 kg </p></div>
                    </tr>
                    </td>
                  <td>Rate</td>
                  <td>Amount(Rs.)</td>
                  <td>Amount(Rs.)</td>
              </tr>
            </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Bill;
