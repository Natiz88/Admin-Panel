import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import PageTitle from "../components/Typography/PageTitle";
import { Link } from "react-router-dom";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import { EditIcon, TrashIcon, FormsIcon } from "../icons";
import { Images } from "./Images";
// import { useState } from "react";
import photo from "./imagesbanner.jpg";

// import Images from "./../utils/images/Images";
import { useState } from "react";
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
  const [img, setImg] = useState(photo);
  const [response, setResponse] = useState([]);

  // const [img, setImg] = useState(null);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
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
      name: "Slug",
      cell: (row) => row.slug,
      sortable: true,
    },
    {
      name: "Photo",
      cell: (row) => (
        <img
          src={row.photo}
          alt="no image"
          onClick={() => setisModalOpen(true)}
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
      name: "Status",
      cell: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => row.action,
      sortable: true,
    },
  ];

  const data = [
    {
      title: "home page banneer",
      slug: "banner",
      photo: photo,
      type: "banner",
      status: "Active",
    },
  ];

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
          iconRight={FormsIcon}
          tag={Link}
          to={`/app/individualDetails/-1`}
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
