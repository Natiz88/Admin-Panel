// import React from 'react'

// const OrderList = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default OrderList

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import PageTitle from "../components/Typography/PageTitle";
import { getData, deleteUsers, deleteAllUsers } from "./../utils/demo/ApiCall";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@windmill/react-ui";
import {view, TrashIcon, FormsIcon } from "../icons";


function OrderList() {
  const [response, setResponse] = useState([]);
  const [id, setId] = useState(null);
  const [del, setDel] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isDeleteSuccessfull, setDeleteSuccessfull] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

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
  };
  const sendDeleteUser = () => {
    deleteUsers(id)
      .then(
        (res) => console.log("del-user", res),
        setTimeout(() => setDeleteSuccessfull(false), 1000),
        setDeleteSuccessfull(true)
      )
      .catch((err) => setErrorText(err.response.data.message));
    setDel(!true);
  };

  const confirmUsersDelete = () => {
    const arr = selected.map((a) => a.id);
    deleteAllUsers(arr)
      .then(
        (res) => console.log("allres", res),
        setTimeout(() => setDeleteSuccessfull(false), 1000),
        setDeleteSuccessfull(true)
      )
      .catch((err) => console.log("err", err));
    setIsUsersModalOpen(false);
  };

  const closeSuccessModal = () => {
    setDeleteSuccessfull(false);
  };

  const sendNotification = () => {
    setIsNotificationModalOpen(true);
  };

  const handleChange = (state) => {
    setSelected(state.selectedRows);
  };

  const closeErrorModal = () => {
    setError(false);
  };

  useEffect(() => {
    setUsersCount(selected.length);
  }, [selected]);
  const columns = [
    {
      name: "Order ID",
      cell: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: "Customer Name",
      cell: (row) => row.name,
      sortable: true,
    },
    {
      name: "Product Name",
      cell: (row) => row.email,
      sortable: true,
    },
    {
      name: "Delivery Date",
      cell: (row) => row.mobile_number,
      sortable: true,
    },

    {
      name: "Total Amount",
      cell: (row) => row.type,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Payment Modes",
      cell: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "View",
      print: false,
      export: false,
      cell: (row) => (
        <div className="flex items-center">
          {/* <Button layout="link" size="icon" aria-label="Edit"></Button> */}

          {/* <Button
            layout="link"
            size="icon"
            aria-label="Edit"
            tag={Link}
            to={`/app/individualDetails/${row.id}`}
          >
            <EditIcon className="w-5 h-5" aria-hidden="true" />
          </Button> */}
          <Button layout="link" size="icon" aria-label="Delete">
            <TrashIcon
              className="w-5 h-5"
              aria-hidden="true"
              onClick={() => deleteUser(row.id)}
            />
          </Button>

          <Button layout="link" size="icon" aria-label="View">
            <view
              className="w-5 h-5"
              aria-hidden="true"
              onClick={() => deleteUser(row.id)}
            />
          </Button>
        </div>
      ),
    }
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
      <PageTitle>Order List</PageTitle>
      {/* <div className="">
        <Button
          iconRight={FormsIcon}
          tag={Link}
          to={`/app/individualDetails/-1`}
        >
          <span>Add new User</span>
        </Button>
      </div> */}
      {selected.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={() => setIsUsersModalOpen(true)}>
            Delete users ({usersCount})
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
      <Modal isOpen={isDeleteSuccessfull} close={closeSuccessModal}>
        <ModalBody>The users were deleted successfully</ModalBody>
      </Modal>
      <Modal isOpen={isError} close={closeErrorModal}>
        <ModalBody>{errorText}</ModalBody>
      </Modal>
    </>
  );
}

export default OrderList;