import React, { useState, useRef, useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { useFormik } from "formik";
import { Link, useHistory, useParams } from "react-router-dom";
import uploadImage from "./../assets/img/upload_pic.png";
import { getIndividualBanner } from "../utils/demo/ApiCall";
import {
  Input,
  Form,
  HelperText,
  Label,
  Button,
  Modal,
  Select,
  Textarea,
} from "@windmill/react-ui";
import axios from "axios";

export default function BannerAdd() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banner, setBanner] = useState({});
  const [imgFile, setimgFile] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [imgPreview, setimgPreview] = useState(uploadImage);
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {},
    title: "",
    status: "",
  });

  useEffect(() => {
    getIndividualBanner(id).then((response) => setBanner(response));
  }, []);

  useEffect(() => {
    if (id > 0) {
      setEditMode(true);
      setType(banner.type);
      setStatus(banner.status);
      setDesc(banner.desc);
      setTitle(banner.title);
      setimgPreview(banner.cover_img);
    }
  }, [banner]);

  const filePickerRef = useRef();

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const pickedFile = event.target.files[0];
      setimgFile(pickedFile);
      // onImageChange();
    }
  };

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
      console.log("res", response);
      if (response?.status === 201 || response?.status === 200) {
        setTimeout(() => {
          setModalOpen(false);
          setModalText("");
          history.push("/app/banners");
        }, 1000);
        setModalText("Banner Added Successfully!!");
        setModalOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateBanner = async () => {
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

      const response = await axios.put(
        `http://192.168.100.17:8081/api/admin/banner/${id}/update`,
        formData,
        config
      );
      if (response?.status === 201 || response?.status === 200) {
        setTimeout(() => {
          setModalOpen(false);
          setModalText("");
          history.push("/app/banners");
        }, 1000);
        setModalText("Banner Updated Successfully!!");
        setModalOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <PageTitle>{editMode ? "Update" : "Add"} Banner</PageTitle>

      <Label className="mt-4">
        <span>Banner Title</span>
        <Input
          className="mt-1"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Label>

      <Label className="mt-4 flex flex-col">
        <span>Status</span>
        {/* <Input className="mt-1" placeholder="Status" /> */}
        <select
          className="mt-1 h-10 border-2 border-gray-200 rounded-s"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={status}>{status}</option>
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
      <Label className="mt-4 flex flex-col">
        <span>Type</span>
        <select
          className="mt-1 h-10 border-2 border-gray-200 rounded-s"
          onChange={(e) => setType(e.target.value)}
        >
          <option value={type}>{type}</option>
          <option value="carousel">Carousel</option>
          <option value="advertisement">Advertisement</option>
        </select>
      </Label>
      <Label className="mt-4">
        <span>Description</span>
        <Textarea
          className="mt-1"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </Label>
      <div className="mt-4">
        <Link to={`/app/banners`}>
          <Button className="w-20">Back</Button>
        </Link>
        <Button
          className="w-20 ml-2"
          onClick={editMode ? updateBanner : addBanner}
        >
          {editMode ? "Update" : "Add"}
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {modalText}
      </Modal>
    </>
  );
}
