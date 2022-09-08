import React, { useState, useRef } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import uploadImage from "./../assets/img/upload_pic.png";

import {
  Input,
  Form,
  HelperText,
  Label,
  Button,
  Select,
  Textarea,
} from "@windmill/react-ui";
import axios from "axios";

export default function BannerAdd() {
  const [title, setTitle] = useState("hello");
  const [status, setStatus] = useState("active");
  const [desc, setDesc] = useState("asda asdsa");
  const [type, setType] = useState("hyr");
  const [banner, setBanner] = useState();
  const [imgFile, setimgFile] = useState();
  const [imgPreview, setimgPreview] = useState(uploadImage);

  const formik = useFormik({
    initialValues: {},
    title: "",
    status: "",
  });

  const filePickerRef = useRef();

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const pickedFile = event.target.files[0];
      setimgFile(pickedFile);
      // onImageChange();
    }
  };

  console.log("img", imgFile);

  const onImageChange = (e) => {
    setimgPreview(URL.createObjectURL(imgFile));
  };

  const addBanner = async () => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("status", status);
      formData.append("type", type);
      formData.append("cover_img", imgFile);

      const response = await axios.post(
        "http://192.168.100.17:8081/api/admin/banner/add",
        formData,
        config
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <PageTitle>Add Banner</PageTitle>

      <Label className="mt-4">
        <span>Banner Title</span>
        <Input className="mt-1" placeholder="Title" />
      </Label>

      <Label className="mt-4 flex flex-col">
        <span>Status</span>
        {/* <Input className="mt-1" placeholder="Status" /> */}
        <select className="mt-1 h-10 border-2 border-gray-200 rounded-s">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </Label>
      <Label>
        <span>Image</span>
      </Label>
      <div className="my-4 h-32 w-full rounded-full relative border-3 border-red-400">
        <label>
          <span>
            <img
              className=" h-32 w-32 -z-10 cursor-pointer"
              src={imgPreview}
              alt="pic"
            />
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={pickedHandler}
            />
          </span>
        </label>
      </div>
      <Label className="mt-4">
        <span>Description</span>
        <Textarea
          className="mt-1"
          placeholder="Description"
          // onChange={(e) => setimgPreview(e.target.value)}
        />
      </Label>
      <div className="mt-4">
        <Link to={`/app/banners`}>
          <Button className="w-20">Back</Button>
        </Link>
        <Button className="w-20 ml-2" onClick={addBanner}>
          Add
        </Button>
      </div>
    </>
  );
}
