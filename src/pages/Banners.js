import React from "react";
import { ImCross } from "react-icons/im";
import PageTitle from "../components/Typography/PageTitle";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { Images } from "./Images";
import { useState } from "react";
import photo from "./imagesbanner.jpg";
=======
import Images from "./../utils/images/Images";
import { useState } from "react";
// import photo from "./imagesbanner.jpg";
>>>>>>> 786caa1a37a84e05bdce8455ca8c963320431595

import {
  Modal,
  Label,
  Button,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@windmill/react-ui";

const Banners = () => {
  console.log("images from", Images);

<<<<<<< HEAD
  const [img, setImg] = useState(photo);
=======
  const [img, setImg] = useState(null);
>>>>>>> 786caa1a37a84e05bdce8455ca8c963320431595
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  return (
    <>
      <PageTitle>Banners</PageTitle>
      <div className="">
        <div className=" border h-40 w-4/5 md:w-3/5 m-auto flex justify-center items-center">
          <div className=" h-full w-full relative">
            <label>
              <span>
                <img
                  className=" h-full w-full -z-10  cursor-pointer "
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

        <div className=" w-full flex justify-center mt-4 mb-20">
          <Button>
            <span>Add Banner</span>
          </Button>
        </div>
<<<<<<< HEAD
        
        </div>

        {Images.map((e) => (
          <div className="mt-10 sm:mt-10 block w-full sm:w-4/5 sm:m-auto sm:flex sm:items-center ">
            <div className="w-full border-2px border-black sm:w-11/12 md:w-4/5">
            <img className="w-full h-full" src={e} />
            </div>
            <div className="sm:mb-3 w-full sm:w-1/4 flex justify-center mt-2 ">
                <Button>Delete</Button>
            </div>
           </div>
        ))} 
        </>)
=======
      </div>

      {Images.map((e) => (
        <div className="mt-10 sm:mt-10 block w-full sm:w-4/5 sm:m-auto sm:flex sm:items-center ">
          <div className="w-full border-2px border-black sm:w-11/12 md:w-4/5">
            <img className="w-full h-full" src={e} />
          </div>
          <div className="sm:mb-3 w-full sm:w-1/4 flex justify-center mt-2 ">
            <Button>delete</Button>
          </div>
        </div>
      ))}
    </>
  );
>>>>>>> 786caa1a37a84e05bdce8455ca8c963320431595
};

export default Banners;
