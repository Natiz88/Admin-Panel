import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import PageTitle from "../components/Typography/PageTitle";
import { getData, deleteUsers, deleteAllUsers } from "./../utils/demo/ApiCall";
import { Link } from "react-router-dom";
import datas from "./../utils/demo/tableData";
import "./Tables.css";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, FormsIcon } from "../icons";

function UserTable() {
  const [response, setResponse] = useState([]);
  const [id, setId] = useState(null);
  const [del, setDel] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const deleteUser = (user) => {
    setId(user);
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  }
  function closeUsersModal() {
    setIsUsersModalOpen(false);
  }
  function closeNotificationModal() {
    setIsNotificationModalOpen(false);
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

  const confirmUsersDelete = () => {
    const arr = selected.map((a) => a.id);
    deleteAllUsers(arr)
      .then((res) => console.log("allres", res))
      .catch((err) => console.log("err", err));
    setIsUsersModalOpen(false);
  };

  const sendNotification = () => {
    setIsNotificationModalOpen(true);
  };

  const handleChange = (state) => {
    setSelected(state.selectedRows);
  };

  console.log(
    "selected rows",
    selected.map((a) => a.id)
  );
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
    },

    {
      name: "Name",
      cell: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      cell: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      cell: (row) => row.mobile_number,
      sortable: true,
    },

    {
      name: "User Type",
      cell: (row) => row.type,
      sortable: true,
    },
    {
      name: "Gender",
      cell: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Joined Date",
      cell: (row) => row.created_at,
      sortable: true,
    },
  ];

  const data = response;
  const tableData = {
    columns,
    data,
  };
  useEffect(() => {
    getData()
      .then((res) => setResponse(res))
      .catch((err) => console.log(err));
  }, [del, confirmUsersDelete]);

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
      {selected.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={() => setIsUsersModalOpen(true)}>
            Delete users
          </Button>
          <Button className="ml-4" onClick={sendNotification}>
            Send Notifications
          </Button>
        </div>
      )}
      <DataTableExtensions {...tableData}>
        <DataTable
          noHeader
          defaultSortField="title"
          defaultSortAsc={false}
          highlightOnHover
          pagination
          selectableRows
          striped
          responsive
          onSelectedRowsChange={handleChange}
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
      <Modal isOpen={isUsersModalOpen} onClose={closeUsersModal}>
        <ModalHeader>Delete Users</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the selected users?
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
      </Modal>
      <Modal isOpen={isNotificationModalOpen} onClose={closeNotificationModal}>
        <ModalHeader>Send Notification</ModalHeader>
        <ModalBody>
          <Textarea></Textarea>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button onClick={confirmDelete}>Send</Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UserTable;
