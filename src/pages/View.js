import React, { useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
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

const View = () => {
  const [img, setImg] = useState(photo);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  return (
    <div className="mt-2 p-5 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <form>
        <PageTitle>User Details</PageTitle>
        <div className=" border rounded h-40 flex justify-center items-center">
          <div className=" h-32 w-32 rounded-full relative">
            <label>
              <span>
                <img
                  className=" h-32 w-32 -z-10 rounded-full cursor-pointer "
                  src={img}
                  alt="pic"
                />
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageChange}
                />
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-around gap-5">
          <div className=" w-1/2">
            <Label className="mt-4">
              <span>Full Name</span>
              <Input
                className="mt-1"
                placeholder="Deepak"
                // onChange={(e) => setproductName(e.target.value)}
              />
            </Label>
          </div>
          <div className="w-1/2">
            <Label className="mt-4">
              <span>Email</span>
              <Input
                className="mt-1"
                placeholder="deepak"
                // onChange={(e) => setproductName(e.target.value)}
              />
            </Label>
          </div>
        </div>

        <div className="flex justify-around gap-5">
          <div className=" w-1/2">
            <Label className="mt-4">
              <span>City</span>
              <Input
                className="mt-1"
                placeholder="Deepak"
                // onChange={(e) => setproductName(e.target.value)}
              />
            </Label>
          </div>
          <div className="w-1/2">
            <Label className="mt-4">
              <span>Address</span>
              <Input
                className="mt-1"
                placeholder="deepak"
                // onChange={(e) => setproductName(e.target.value)}
              />
            </Label>
          </div>
        </div>

        <div className="flex justify-around gap-5">
          <div className=" w-1/2">
            <Label className="mt-4">
              <span>Phone Number</span>
              <Input
                className="mt-1"
                placeholder="Deepak"
                // onChange={(e) => setproductName(e.target.value)}
              />
            </Label>
          </div>
          <div className="w-1/2">
            <Label className="mt-4">
              <span>Gender</span>
              <Input
                className="mt-1"
                placeholder="deepak"
                // onChange={(e) => setproductName(e.target.value)}
              />
            </Label>
          </div>
        </div>

        <div className="flex justify-around gap-5">
          <div className=" w-1/2">
            <Label className="mt-4">
              <span>Password</span>
              <Input
                className="mt-1"
                placeholder="Deepak"
                // onChange={(e) => setproductName(e.target.value)}
              />
            </Label>
          </div>
          <div className="w-1/2">
            <Label className="mt-4">
              <span>Confirm Password</span>
              <Input
                className="mt-1"
                placeholder="deepak"
                // onChange={(e) => setproductName(e.target.value)}
              />
            </Label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default View;
