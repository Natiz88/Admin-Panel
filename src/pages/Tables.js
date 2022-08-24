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
import { EditIcon, TrashIcon, FormsIcon } from "../icons";

function UserTable() {
  const [mainResponse, setMainResponse] = useState([]);
  const [response, setResponse] = useState([]);
  const [id, setId] = useState(null);
  const [buttonValue, setButtonValue] = useState("all");
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


  //create this function for sorting ind cor all
  function setData() {
    console.log("function");
    if (buttonValue === "individual") {
      let resp = mainResponse.filter((r) => r.type === "individual");
      setResponse(resp);
    } else if (buttonValue === "corporate") {
      let resp = mainResponse.filter((r) => r.type === "corporate");
      setResponse(resp);
    } else {
      console.log("main", mainResponse);
      setResponse(mainResponse);
    }
  }
  useEffect(() => {
    getData()
      .then((res) => {
        setMainResponse(res);
        setResponse(res);
        console.log("reloaded", mainResponse);
      })
      .catch((err) => console.log(err));
  }, []);


  //for type handle in table
  const typeHandler = (e) => {
    setButtonValue(e);
  };

  useEffect(() => {
    setData();
  }, [buttonValue]);

  console.log("resr,", mainResponse);
  console.log("button,", buttonValue);

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
            Delete users ({usersCount})
          </Button>
          <Button className="ml-4" onClick={sendNotification}>
            Send Notifications
          </Button>
        </div>
      )}
      <div className="w-full  flex justify-start mt-8 text-[24px]">
        <button
          className="ml-2 w-[80px] border-b-2 border-black"
          onClick={(e) => typeHandler("all")}
        >
          All
        </button>
        <button
          className="ml-2 w-[30px] bg-red-400"
          value="individual"
          onClick={(e) => typeHandler("individual")}
        >
          Ind
        </button>
        <button
          className="ml-2 w-[30px]"
          onClick={(e) => typeHandler("corporate")}
        >
          corp
        </button>
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

export default UserTable;
