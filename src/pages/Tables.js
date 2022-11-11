import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import PageTitle from "../components/Typography/PageTitle";
import { getData, deleteUsers, deleteAllUsers } from "./../utils/demo/ApiCall";
import { Link } from "react-router-dom";
// import { MdCorporateFare } from 'react-icons/md';
// import { HiUserGroup } from 'react-icons/hi';
// import { GiPerson } from 'react-icons/gi';
import datas from "./../utils/demo/tableData";
import "./Tables.css";
import { AiOutlineEye } from "react-icons/ai";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, FormsIcon } from "../icons";
import View from "./View";


function UserTable() {
  const [mainResponse, setMainResponse] = useState([]);
  const [col, setCol] = useState([]);
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
  const [indUser,setIndUser] = useState({})




  const [viewModalOpen, setViewModalOpen] = useState(false);
  function closeViewModal() {
    setViewModalOpen(false);
  }

  function viewUser(row){
    setViewModalOpen(true)
    setIndUser(row)
  }




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
      isVisible: false,
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
    {
      name: "Update",
      print: false,
      export: false,
      cell: (row) => (
        <div className="flex items-center">
          {/* Added by deepak katwal */}
          <Button layout="link" size="icon" aria-label="View Details"></Button>

          <Button
            layout="link"
            size="icon"
            aria-label="View Details"
            // tag={Link}
            // to={`/app/view/${row.id}`}
            onClick={()=>viewUser(row)}
          >
            <AiOutlineEye className="w-5 h-5" aria-hidden="true" />
          </Button>

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
  ];

  console.log("colc", col);

  //create this function for sorting ind cor all
  function setData() {
    console.log("function");
    if (buttonValue === "individual") {
      let resp = mainResponse.filter((r) => r.type === "individual");
      // let cols = columns.filter((c) => c.name === "Gender");
      // setCol(cols)
      setResponse(resp);
    } else if (buttonValue === "corporate") {
      let resp = mainResponse.filter((r) => r.type === "corporate");
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

  //for type handle in table
  const typeHandler = (e) => {
    setButtonValue(e);
  };

  useEffect(() => {
    setData();
  }, [buttonValue]);

  console.log("resr,", mainResponse);
  console.log("button,", buttonValue);
  // const initialState = { hiddenColumns: ['Name'] };

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
      {/* <View/> */}


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

      <div className="w-full  flex justify-start mt-8 text-[24px] gap-4">
        <p
          className={
            buttonValue === "all"
              ? "  text-blue-500 font-semibold border-b-4 border-blue-400 pb-2"
              : "text-black"
          }
          onClick={(e) => typeHandler("all")}
        >
          {/* <HiUserGroup/> */}
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
          {/* <GiPerson/> */}
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
          {/* <MdCorporateFare/>  */}
          <p>Corporate</p>
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
          initialState
          striped
          responsive
          onSelectedRowsChange={handleChange}
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




      <Modal className="w-1/2" isOpen={viewModalOpen} onClose={closeViewModal}>
        <View user={indUser}/>
      </Modal>
    </>
  );
}

export default UserTable;
