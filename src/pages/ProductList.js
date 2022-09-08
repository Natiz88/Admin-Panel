import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import PageTitle from "../components/Typography/PageTitle";
import { deleteUsers, deleteAllUsers } from "./../utils/demo/ApiCall";
import { Link } from "react-router-dom";
// import { MdCorporateFare } from 'react-icons/md';
// import { HiUserGroup } from 'react-icons/hi';
// import { GiPerson } from 'react-icons/gi';
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, FormsIcon } from "../icons";
import { getProducts } from "./../utils/demo/ApiCall";

const ProductList = () => {
  const [isError, setError] = useState(false);
  const [isDeleteSuccessfull, setDeleteSuccessfull] = useState(false);
  const [errorText, setErrorText] = useState("");

  const closeSuccessModal = () => {
    setDeleteSuccessfull(false);
  };

  const closeErrorModal = () => {
    setError(false);
  };
  const [mainResponse, setMainResponse] = useState([]);
  const [response, setResponse] = useState([]);
  // const [data,setData]=useState()]

  useEffect(() => {
    // setCol(columns)
    getProducts()
      .then((res) => {
        setMainResponse(res.data);
        setResponse(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("product", response);

  const columns = [
    {
      name: "S.N.",
      cell: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: "Update",
      print: false,
      export: false,
      cell: (row) => (
        <div className="flex items-center">
          <Button layout="link" size="icon" aria-label="Edit"></Button>
          <Button
            layout="link"
            size="icon"
            aria-label="Edit"
            tag={Link}
            to={`/app/addProduct/${row.id}`}
          >
            <EditIcon className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button layout="link" size="icon" aria-label="Delete">
            <TrashIcon
              className="w-5 h-5"
              aria-hidden="true"
              //   onClick={() => deleteUser(row.id)}
            />
          </Button>
        </div>
      ),
    },
  ];

  // const closeErrorModal = () => {
  //   setError(false);
  // };

  // const columns = [
  //   {
  //     name: "S.N.",
  //     cell: (row, idx) => idx + 1,
  //     sortable: false,
  //   },
  //   {
  //     id:"name",
  //     name: " Product Name",
  //     cell: (row) => row.name,
  //     sortable: true,
  //   },
  //   {
  //     name: "Product Image",
  //     cell: (row) => row.image,
  //     sortable: true,
  //   },
  //   {
  //     id:"category",
  //     name: "Category",
  //     cell: (row) => row.discount,
  //     sortable: true,
  //   },

  //   {
  //     name: "Sub-Category",
  //     cell: (row) => row.weight,
  //     sortable: true,
  //     isVisible: false,
  //   },
  //   {
  //     name: "Status",
  //     cell: (row) => row.desc,
  //     sortable: true,
  //   },
  //   {
  //     name: "Added Date",
  //     cell: (row) => row.size,
  //     sortable: true,
  //   },
  //   {
  //     name: "Update",
  //     print: false,
  //     export: false,
  //     cell: (row) => (
  //       <div className="flex items-center">
  //         <Button layout="link" size="icon" aria-label="Edit"></Button>

  //         <Button
  //           layout="link"
  //           size="icon"
  //           aria-label="Edit"
  //           tag={Link}
  //           to={`/app/addProduct/${row.id}`}
  //         >
  //           <EditIcon className="w-5 h-5" aria-hidden="true" />
  //         </Button>
  //         <Button layout="link" size="icon" aria-label="Delete">
  //           <TrashIcon
  //             className="w-5 h-5"
  //             aria-hidden="true"
  //           //   onClick={() => deleteUser(row.id)}
  //           />
  //         </Button>
  //       </div>
  //     ),
  //   }

  // ];

  const data = response;
  const tableData = {
    columns,
    data,
  };
  //   {
  //     name: " Product Name",
  //     cell: (row) => row.name,
  //     sortable: true,
  //   },
  //   {
  //     name: "Description",
  //     cell: (row) => row.email,
  //     sortable: true,
  //   },
  //   {
  //     name: "Category",
  //     cell: (row) => row.mobile_number,
  //     sortable: true,
  //   },

  //   {
  //     name: "Sub-Category",
  //     cell: (row) => row.type,
  //     sortable: true,
  //     isVisible: false,
  //   },
  //   {
  //     name: "Gender",
  //     cell: (row) => row.gender,
  //     sortable: true,
  //   },
  //   {
  //     name: "Joined Date",
  //     cell: (row) => row.created_at,
  //     sortable: true,
  //   },
  // ];

  return (
    <div>
      <PageTitle>Product List</PageTitle>
      <div className="">
        <Button
          //   iconRight={FormsIcon}
          tag={Link}
          to={`/app/addProducts`}
        >
          <span>Add Product</span>
        </Button>
      </div>

      {/* {selected.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={() => setIsUsersModalOpen(true)}>
            Delete users ({usersCount})
          </Button>
          <Button className="ml-4" onClick={sendNotification}>
            Send Notifications
          </Button>
        </div>
      )} */}
      {/* <div className="w-full  flex justify-start mt-8 text-[24px] gap-4">
        <p
          className={
            buttonValue === "all"
              ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2"
              : "text-black"
          }
          onClick={(e) => typeHandler("all")}
        >
          <HiUserGroup/>
          <p className="ml-2">All user</p>
        </p>
        <p
          className={
            buttonValue === "individual"
              ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2"
              : "text-black"
          }
          value="individual"
          onClick={(e) => typeHandler("individual")}
        >
          <GiPerson/>
          <p>Individual</p>
        </p>
        <p
          className={
            buttonValue === "corporate"
              ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2"
              : "text-black"
          }
          onClick={(e) => typeHandler("corporate")}
        >
          <MdCorporateFare/> 
          <p>Corporate</p>
        </p>
      </div> */}
      <DataTableExtensions {...tableData}>
        <DataTable
          noHeader
          //   columns={col}
          defaultSortFieldId="name"
          defaultSortAsc={true}
          highlightOnHover
          pagination
          selectableRows
          initialState
          striped
          responsive
          // onSelectedRowsChange={handleChange}
        />
      </DataTableExtensions>
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>Are you sure you want to delete the user?</ModalBody>
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
      </Modal> */}
      {/* <Modal isOpen={isUsersModalOpen} onClose={closeUsersModal}>
        <ModalHeader>Delete Users</ModalHeader>
        <ModalBody>
          Are you sure you want to delete {usersCount} users?
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeUsersModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={confirmUsersDelete}>Ok, Continue</Button>
          </div>
        </ModalFooter>
      </Modal> */}
      {/* <Modal isOpen={isNotificationModalOpen} onClose={closeNotificationModal}>
        <ModalHeader>Send Notification</ModalHeader>
        <ModalBody>
          <Textarea></Textarea>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button onClick={confirmDelete}>Send</Button>
          </div>
        </ModalFooter>
      </Modal> */}
      <Modal isOpen={isDeleteSuccessfull} close={closeSuccessModal}>
        <ModalBody>Product added Successfully.</ModalBody>
      </Modal>
      <Modal isOpen={isError} close={closeErrorModal}>
        <ModalBody>{errorText}</ModalBody>
      </Modal>
    </div>
  );
};

export default ProductList;
