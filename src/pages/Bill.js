import React, { useState } from "react";
// import './billtable.css'
import logo from "./../components/images/logo.png";
import product from "./../components/images/image.jpg";

const Bill = () => {
  const [tableAttributeData, setTableAttributeData] = useState([]);

  return (
    <div className=" flex w-full text-xs">
      <div className="w-1/2 ">
        <div className="p-3 pr-5">
          <div className="flex justify-between h-10">
            <div>Date:</div>
            <img src={logo} alt="Logo" className="flex w-2/5 h-12 self-end" />
          </div>
          <div>
            <h1 className="mb-2 font-medium text-xl ">Order Slip</h1>
            <div className="flex flex-col gap-4">
              <div>
                <p>Bill No.:</p>
                <p>Payment:</p>
              </div>
              <div>
                <p>Order Date:</p>
                <p>Order ID:</p>
              </div>
              <div>
                <p>Name:</p>
                <p>Address:</p>
              </div>
            </div>
          </div>
          <div className="mt-2">
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
                <td>
                  <tr>
                    <div className="tb">
                      <p>Business card asdaj asdakjas asia</p>
                      <p>Discount: 200</p>
                      <p>Shipping cost</p>
                    </div>
                  </tr>
                  <tr>
                    <div className="tb">
                      <p>transpotrt sk </p>
                      <p>136 kg </p>
                    </div>
                  </tr>
                </td>
                <td>Rate</td>
                <td>Amount(Rs.)</td>
                <td>Amount(Rs.)</td>
              </tr>
            </table>
          </div>

          <div className="flex justify-between mt-3">
            <div className="font-semibold w-2/3">
              <p>
                Note: For Tax Invoice Please contact with us within 15 days.
              </p>
              <p>support@saralprint.com</p>
            </div>
            <div className="self-end w-1/4">
              <p>Bill Printed by</p>
              <p>Accounted Name</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2  ">
        <div className="p-3 pl-5">
          <div className="flex justify-between h-10">
            <div>Date:</div>
            <img src={logo} alt="Logo" className="flex w-2/5 h-12 self-end" />
          </div>
          <div>
            <h1 className="mb-2 font-medium text-xl ">Order Slip</h1>
            <div className="flex justify-between">
              <div className="flex flex-col gap-4 w-1/2">
                <div>
                  <p>Bill No.:</p>
                  <p>Payment:</p>
                </div>
                <div>
                  <p> Order Date:</p>
                  <p>Order ID:</p>
                </div>
                <div>
                  <p>Name:</p>
                  <p>Address:</p>
                </div>
              </div>
              <div className="w-1/2 flex justify-center">
              <img src={product} alt="Product Img" />
              </div>
            </div>
          </div>
          <div className="mt-2">
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
                <td>
                  <tr>
                    <div className="tb">
                      <p>Business card asdaj asdakjas asia</p>
                      <p>Discount: 200</p>
                      <p>Shipping cost</p>
                    </div>
                  </tr>
                  <tr>
                    <div className="tb">
                      <p>transpotrt sk </p>
                      <p>136 kg </p>
                    </div>
                  </tr>
                </td>
                <td>Rate</td>
                <td>Amount(Rs.)</td>
                <td>Amount(Rs.)</td>
              </tr>
            </table>
          </div>

          <div className="flex justify-between mt-3">
            <div className="font-semibold w-2/3">
              <p>
                Note: For Tax Invoice Please contact with us within 15 days.
              </p>
              <p>support@saralprint.com</p>
            </div>
            <div className="self-end w-1/4">
              <p>Bill Printed by</p>
              <p>Accounted Name</p>
            </div>
          </div>
          <p>
            ---------------------------------------------------------------------------------------------------------
          </p>

          <div className="flex justify-between w-full">
            <div className="font-semibold w-1/2">
              <h3 className="flex justify-start">To</h3>
              <div className="mt-2">
                <p>Full Name:</p>
                <p>Delivery Address:</p>
                <p>Contact:</p>
                <p>Order ID:</p>
                <p>Delivery Date:</p>
              </div>
            </div>

            <div className="w-1/2 p-2">
              <div>
                <h3 className="flex justify-start font-semibold">From</h3>
                <img src={logo} alt="Logo" className="pl-5" />
                <div className="flex flex-col justify-center">
                  <p>www.saralprint.com</p>
                  <p>Itahari,Sunsari,Nepal</p>
                  <p>+977 025-582660 | 9817303073</p>
                  <p>support@saralprint.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Bill;
