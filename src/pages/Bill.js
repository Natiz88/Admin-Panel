<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
// import './billtable.css'
=======
import React, { useState, useRef } from "react";
import BillTable from "./../components/BillTable";
import logo from "./../components/images/BillingLogo.png";
import product from "./../components/images/image.jpg";
>>>>>>> e0c26fb18c262d20fba56a792760c72a0b55c6f4
import {
  Label,
  Button,
} from "@windmill/react-ui";
<<<<<<< HEAD
import { EditIcon, TrashIcon, FormsIcon } from "../icons";
=======
>>>>>>> e0c26fb18c262d20fba56a792760c72a0b55c6f4

const Bill = () => {
  const ref = useRef();
  const secondRef = useRef();
  const [tableAttributeData, setTableAttributeData] = useState([]);
<<<<<<< HEAD
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
=======
  const printBill = () => {
    let element = ref.current.innerHTML;
    let element2 = secondRef.current.innerHTML;
    let doc = document.body.innerHTML;
    document.body.innerHTML = element;
    window.print();
    document.body.innerHTML = element2;
    window.print();
    document.body.innerHTML = doc;
  };
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  return (
    <>
      <p className=" flex flex-col w-full text-xs w-[1780px]">
        <div className="w-full " ref={ref}>
          <div className="p-3 pr-5 pt-8">
          <Label className="mb-2 font-bold text-xl text-center">
                Order Slip
              </Label>
            <div className="flex justify-between mb-3 ">
              <div className="">
                <div className="flex">
                  <Label className="font-bold ">Date: </Label>
                  <Label>{date}</Label>
                </div>
                <div className="flex">
                  <Label className=" font-bold">Time: </Label>
                  <Label> {time}</Label>
                </div>
              </div>
              <img src={logo} alt="Logo" className="flex h-12 self-end" />
            </div>
            <div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <Label className=" font-bold ">Bill No:</Label>
                  <Label className=" font-bold ">Payment:</Label>
                </div>
                <div>
                  <Label className=" font-bold ">Order Date:</Label>
                  <Label className=" font-bold ">Order ID:</Label>
                </div>
                <div>
                  <Label className=" font-bold ">Name:</Label>
                  <Label className=" font-bold ">Address:</Label>
                </div>
              </div>
            </div>
            <div className="mt-4 w-4/5">
              <BillTable />
            </div>

            <div className="flex justify-between">
              <div className="font-bold w-2/3">
                <Label className=" ">
                  Note: For Tax Invoice Please contact with us within 15 days.
                </Label>
                <Label className="  ">support@saralprint.com</Label>
                <Label className=" font-normal ">www.saralprint.com</Label>
              </div>
              <div className="self-end w-1/4">
                <Label>Bill Printed by</Label>
                <Label className=" font-bold ">Accounted Name</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full " ref={secondRef}>
          <div className="p-3 pl-5 pt-8">
          <Label className="mb-2 font-bold text-xl text-center">
                Order Slip
              </Label>
            <div className="flex justify-between h-10 mb-4">
              <div className="">
                <div className="flex">
                  <Label className=" font-bold ">Date: </Label>
                  <Label>{date}</Label>
                </div>
                <div className="flex">
                  <Label className="font-bold">Time: </Label>
                  <Label> {time}</Label>
                </div>
              </div>
              <img src={logo} alt="Logo" className="flex h-12 self-end" />
            </div>
            <div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-4 w-1/2 ">
                  <div>
                    <Label className=" font-bold ">Bill No:</Label>
                    <Label className=" font-bold ">Payment:</Label>
                  </div>
                  <div>
                    <Label className=" font-bold "> Order Date:</Label>
                    <Label className=" font-bold ">Order ID:</Label>
                  </div>
                  <div>
                    <Label className=" font-bold ">Name:</Label>
                    <Label className=" font-bold ">Address:</Label>
                  </div>
                </div>
                <div className="w-1/2 flex justify-center">
                  <img src={product} alt="Product Img" />
                </div>
              </div>
            </div>
            <div className="mt-4 w-4/5">
              <BillTable />
            </div>

            <div className="flex justify-between mt-3">
              <div className="font-bold w-2/3">
                <Label>
                  Note: For Tax Invoice Please contact with us within 15 days.
                </Label>
                <Label>support@saralprint.com</Label>
                <Label className=" font-normal ">www.saralprint.com</Label>

              </div>
              <div className="self-end w-1/4">
                <Label>Bill Printed by</Label>
                <Label>Accounted Name</Label>
              </div>
            </div>
            <Label>
              ----------------------------------------------------------------------------------------------------------
            </Label>
            {/* <hr className=" w-56 border-black rotate-45" /> */}
            <div className="flex justify-between w-full">
              <div className="font-bold w-1/2">
                <Label className="flex justify-start">To</Label>
                <div className="mt-2">
                  <Label className="mb-1">Full Name:</Label>
                  <Label className="mb-1">Delivery Address:</Label>
                  <Label className="mb-1">Contact:</Label>
                  <Label className="mb-1">Order ID:</Label>
                  <Label >Delivery Date:</Label>
                </div>
              </div>

              <div className="w-1/2 p-2">
                <div>
                  <Label className="flex justify-start font-bold">
                    From
                  </Label>
                  <img src={logo} alt="Logo" className=" h-12" />
                  <div className="flex flex-col justify-center">
                    <Label>www.saralprint.com</Label>
                    <Label>Itahari,Sunsari,Nepal</Label>
                    <Label>+977 025-582660 | 9817303073</Label>
                    <Label>support@saralprint.com</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </p>

      <div>
        <Button onClick={printBill}>Print Bill</Button>
      </div>
    </>
>>>>>>> e0c26fb18c262d20fba56a792760c72a0b55c6f4
  );
};

export default Bill;
