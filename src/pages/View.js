import React, { useState, useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {Link} from 'react-router-dom'

import {
  Input,
  Label,
  Button,
  Select,
  Textarea,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import photo from "./../components/images/userImage.jpg";
import { EditIcon } from "../icons";

const View = ({ user }) => {
  const [img, setImg] = useState(photo);
  const [type, setType] = useState("");
  const [isPriceModalOpen, setPriceModalOpen] = useState(false);

  useEffect(()=>{    if(user.type === "corporate"){
    setImg(user.pan_document)
  }
  else if(user.type === "individual" && user.profile_image !== null){
    setImg(user.profile_image)
  }},[]) 

    console.log("user",user)


  function closeModal() {
    setPriceModalOpen(false);
  }
  console.log("user", user);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  

  return (
    <div className="mt-2 bg-white rounded-lg shadow-md dark:bg-gray-800 p-5 w-[700px] h-[600px]">
      <form>
        <div className="flex justify-center w-full items-center ">
          <div>
            <PageTitle>{user.type} User Details</PageTitle>
          </div>
          <div className="ml-8 border">
            <Button
              layout="link"
              size="icon"
              aria-label="Edit"
              tag={Link}
              to={`/app/individualDetails/${user.id}`}
            >
              <EditIcon className="w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="w-full h-48 rounded-full relative flex justify-center">
          <label>
            <span>
              <img
                className="h-full w-full -z-10 cursor-pointer "
                src={img}
                alt="pic"
              />
            </span>
          </label>
        </div>
        <div className="flex justify-around gap-5">
          <div className=" w-1/2">
            <Label className="mt-4">
              <span>Full Name:</span>
              <span className="ml-2">{user.name}</span>
            </Label>
          </div>
          <div className="w-1/2">
            <Label className="mt-4">
              <span>Email:</span>
              <span className="ml-2">{user.email}</span>
            </Label>
          </div>
        </div>

        <div className="flex justify-around gap-5">
          <div className=" w-1/2">
            <Label className="mt-4">
              <span>City:</span>
              <span className="ml-2">{user.name}</span>
            </Label>
          </div>
          <div className="w-1/2">
            <Label className="mt-4">
              <span>Address:</span>
              <span className="ml-2">{user.address}</span>
            </Label>
          </div>
        </div>

        <div className="flex justify-around gap-5">
          <div className=" w-1/2">
            <Label className="mt-4">
              <span>Phone Number:</span>
              <span className="ml-2">{user.mobile_number}</span>
            </Label>
          </div>
          <div className="w-1/2">
            <Label className="mt-4">
              <span>Gender:</span>
              <span className="ml-2">{user.gender}</span>
            </Label>
          </div>
        </div>

        <div className="flex justify-around gap-5">
          <div className=" w-1/2">
            <Label className="mt-4">
              <span>Account Type:</span>
              <span className="ml-2">{user.type}</span>
            </Label>
          </div>

          <div className="w-1/2">
            {user.type === "corporate" && (
              <Label className="mt-4">
                <span>PAN Number:</span>
                <span className="ml-2">{user.pan_number}</span>
              </Label>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default View;
