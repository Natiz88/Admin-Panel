import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import PageTitle from "../components/Typography/PageTitle";
import { getData, deleteUsers } from "./../utils/demo/ApiCall";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHeader,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, FormsIcon, SortIcon } from "../icons";

function UserTable() {
  const [response, setResponse] = useState([]);
  const [id, setId] = useState(null);
  const [del, setDel] = useState(true);
  useEffect(() => {
    getData()
      .then((res) => setResponse(res))
      .catch((err) => console.log(err));
  }, [del]);

  const deleteUser = (user) => {
    setId(user);
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  function closeModal() {
    setIsModalOpen(false);
  }
  const confirmDelete = () => {
    sendDeleteUser();
    setIsModalOpen(false);
    setTimeout(() => setAlertOpen(false), 1000);
    setAlertOpen(true);
  };
  const sendDeleteUser = () => {
    deleteUsers(id).then((res) => console.log("del-user", res));
    setDel(!true);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.mobile_number,
      sortable: true,
    },
    {
      name: "User Type",
      selector: (row) => row.type,
      sortable: true,
    },
    // {
    //   name: "Gender",
    //   selector: (row) => row.gender,
    //   sortable: true,
    // },
    {
      name: "Joined Date",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Update",
      selector: (row) => (
        <div className="flex items-center space-x-4">
          <Button layout="link" size="icon" aria-label="Edit"></Button>

          <Button
            layout="link"
            size="icon"
            aria-label="Edit"
            tag={Link}
            to={`/app/individualDetails/${row.id}`}
          >
            <EditIcon className="w-5 h-5" aria-hidden="true" />
          </Button>
          <Button layout="link" size="icon" aria-label="Delete">
            <TrashIcon
              className="w-5 h-5"
              aria-hidden="true"
              onClick={() => deleteUser(row.id)}
            />
          </Button>
        </div>
      ),
      /* <span className="flex">
          <EditIcon className="w-5 h-5 cursor-pointer" aria-hidden="true" />
          <TrashIcon
            className="w-5 h-5 ml-2 cursor-pointer"
            aria-hidden="true"
            onClick={() => deleteUser()}
          />
      </span> */
    },
  ];

  const data = response;
  console.log("data", data);
  const tableData = {
    columns,
    data,
  };
  return (
    <>
      <PageTitle>User Details</PageTitle>
      <div className="">
        <Button
          iconRight={FormsIcon}
          tag={Link}
          to={`/app/individualDetails/-1`}
        >
          <span>Add new User</span>
        </Button>
      </div>
      <DataTableExtensions {...tableData}>
        <DataTable
          className="mt-20"
          noHeader
          defaultSortField="title"
          // sortIcon={<SortIcon />}
          subHeader={true}
          subHeaderAlign="center"
          highlightOnHover
          pagination
          selectableRows
          striped
        />
      </DataTableExtensions>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
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
      </Modal>
    </>
  );
}

export default UserTable;
