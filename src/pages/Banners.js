import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import PageTitle from "../components/Typography/PageTitle";
import { Link } from "react-router-dom";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import { EditIcon, TrashIcon, FormsIcon } from "../icons";
import photo from "./imagesbanner.jpg";
import zoro from "./../assets/Zoro.jpg";
import { AiOutlineEye } from "react-icons/ai";
import { getBanners, getBanner, deleteBanner } from "./../utils/demo/ApiCall";
import Images from "./../utils/images/Images";
// import photo from "./imagesbanner.jpg";

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

  const [isModalOpen, setisModalOpen] = useState(false);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [img, setImg] = useState();
  const [response, setResponse] = useState([]);
  const [id, setId] = useState(null);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [mainResponse, setMainResponse] = useState([]);

  const [isDeleteSuccessfull, setDeleteSuccessfull] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [del, setDel] = useState(true);
  // const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  // const [img, setImg] = useState(null);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const deleteBanners = (banner) => {
    setId(banner);
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  const confirmDelete = () => {
    sendDeleteBanner();
    setIsModalOpen(false);
  };

  const sendDeleteBanner = () => {
    deleteBanner(id)
      .then(
        (res) => console.log("del-Banner", res),
        setTimeout(() => setDeleteSuccessfull(false), 1000),
        setDeleteSuccessfull(true)
      )
      .catch((err) => setErrorText(err.response.data.message));
    setDel(!true);
  };

  const columns = [
    {
      name: "S.N.",
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: "Title",
      cell: (row) => row.title,
      sortable: true,
    },

    {
      name: "Photo",
      cell: (row) => (
        <img
          src={row.banner}
          alt="no image"
          onClick={() => setisModalOpen(true)}
          className="cursor-pointer"
        />
      ),
      sortable: true,
    },

    {
      name: "Type",
      cell: (row) => row.type,
      sortable: true,
      isVisible: false,
    },
    {
      name: "Description",
      cell: (row) => row.desc,
      sortable: true,
      isVisible: false,
    },
    {
      name: "Status",
      cell: (row) => row.status,
      sortable: true,
    },
    // {
    //   name: "Action",
    //   cell: (row) => row.action,
    //   sortable: true,
    // },

    {
      name: "Action",
      print: false,
      export: false,
      cell: (row) => (
        <div className="flex items-center">
          {/* Added by deepak katwal */}
          {/* <Button layout="link" size="icon" aria-label="View Details"></Button> */}

          <Button layout="link" size="icon" aria-label="Edit"></Button>

          <Button
            layout="link"
            size="icon"
            aria-label="Edit"
            tag={Link}
            to={`/app/BannerAdd/${id}`}
          >
            <EditIcon className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button layout="link" size="icon" aria-label="Delete">
            <TrashIcon
              className="w-5 h-5"
              aria-hidden="true"
              onClick={() => deleteBanners(row.id)}
            />
          </Button>
        </div>
      ),
    },
  ];

  // useEffect(() => {
  //   setData();
  // }, [buttonValue]);

  // useEffect(() => {
  //   getBanner()
  //     .then((res) => setResponse(res))
  //     .catch((err) => console.log(err));
  // }, [del, confirmBannerDelete]);

  // getting data
  useEffect(() => {
    // setCol(columns)
    getBanners()
      .then((res) => {
        setMainResponse(res);
        setResponse(res);
        console.log("reloaded", mainResponse);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = response;
  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div>
        <PageTitle>Banners</PageTitle>
      </div>
      <div className="">
        <Button
          //   iconRight={FormsIcon}
          tag={Link}
          to={`/app/BannerAdd`}
        >
          <span>Add Banner</span>
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setisModalOpen(false)}>
        <div className="h-64">
          <img src={photo} alt="" className="h-48 mt-3" />
        </div>
      </Modal>

      <DataTableExtensions {...tableData}>
        <DataTable
          // noHeader
          // defaultSortField="title"
          defaultSortAsc={false}
          highlightOnHover
          pagination
          selectableRows
          initialState
          striped
          responsive
          // onSelectedRowsChange={handleChange}
        />
      </DataTableExtensions>

      <Modal isOpen={IsModalOpen} onClose={closeModal}>
        <ModalHeader>Delete Banner</ModalHeader>
        <ModalBody>Are you sure you want to delete the Banner?</ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={confirmDelete}>Ok, Continue</Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* <DataTableExtensions {...tableData}></DataTableExtensions> */}

      {/* <PageTitle>Banners</PageTitle>
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

      {Images.map((e) => (
        <div className="mt-10 sm:mt-10 block w-full sm:w-4/5 sm:m-auto sm:flex sm:items-center ">
          <div className="w-full border-2px border-black sm:w-11/12 md:w-4/5">
            <img className="w-full h-full" src={e} />
          </div>
          <div className="sm:mb-3 w-full sm:w-1/4 flex justify-center mt-2 ">
            <Button>delete</Button>
          </div>
        </div>
      ))} */}
    </>
  );
};

export default Banners;
