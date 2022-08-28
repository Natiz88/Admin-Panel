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
  const [buttonValue, setButtonValue] = useState("allorders");
  const [mainResponse, setMainResponse] = useState([]);



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
      // cell: (row) => row.customerName,
      sortable: true,
    },
    {
      name: "Product Name",
      cell: (row) => row.email,
      // cell: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Delivery Date",
      cell: (row) => row.mobile_number,
      // cell: (row) => row.deliveredDate,
      sortable: true,
    },

    {
      name: "Total Amount",
      cell: (row) => row.type,
      // cell: (row) => row.totalAmount,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => row.gender,
      // cell: (row) => row.status,
      sortable: true,
    },
    {
      name: "Payment Modes",
      cell: (row) => row.created_at,
      // cell: (row) => row.paymentModes,
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



  function setData() {
    console.log("function");
    if (buttonValue === "individual") {
      let resp = mainResponse.filter((r) => r.status === "pending");
      // let cols = columns.filter((c) => c.name === "Gender");
      // setCol(cols)
      setResponse(resp);
    } else if (buttonValue === "corporate") {
      let resp = mainResponse.filter((r) => r.status === "deffered");
      // let cols = columns.filter((c) => c.name === "Name");
      // setCol(cols)
      
      setResponse(resp);
    }
    else if (buttonValue === "individual") {
      let resp = mainResponse.filter((r) => r.status === "cancelled");
      // let cols = columns.filter((c) => c.name === "Gender");
      // setCol(cols)
      setResponse(resp);
    } else if (buttonValue === "corporate") {
      let resp = mainResponse.filter((r) => r.status === "underProcess");
      // let cols = columns.filter((c) => c.name === "Name");
      // setCol(cols)
      
      setResponse(resp);
    }
    else if (buttonValue === "corporate") {
    let resp = mainResponse.filter((r) => r.status === "delivered");
    // let cols = columns.filter((c) => c.name === "Name");
    // setCol(cols)
    
    setResponse(resp);
  } else {
      console.log("main", mainResponse);
      // setCol(columns)
      setResponse(mainResponse);

    }
  }

  useEffect(() => {
    // setCol(columns)
    getData()
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

  


  const typeHandler = (e) => {
    setButtonValue(e);
  };

  useEffect(() => {
    setData();
  }, [buttonValue]);

  

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

<div className="w-full  flex justify-start  text-[24px] gap-4 border-gray-400 pb-3  ">
        <p
          className={buttonValue === "allorders" ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2":"text-black"}
          onClick={(e) => typeHandler("allorders")}
        >
           All Orders
        </p>
        <p
           className={buttonValue === "pending" ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2":"text-black"} 
          onClick={(e) => typeHandler("pending")}
        >
          <p>Pending</p>
        </p>
        <p
            className={buttonValue === "deffered" ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2":"text-black"}
          onClick={(e) => typeHandler("deffered")}
        >
           Deffered
        </p>
        <p
         className={buttonValue === "cancelled" ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2":"text-black"}
          onClick={(e) => typeHandler("cancelled")}
        >
           Cancelled
        </p>
        <p
            className={buttonValue === "underProcess" ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2":"text-black"}
          onClick={(e) => typeHandler("underProcess")}
        >
          Under Process
        </p>
        <p
         className={buttonValue === "delivered" ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2":"text-black"}
          onClick={(e) => typeHandler("delivered")}
        >
           Delivered
        </p>
      </div>

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