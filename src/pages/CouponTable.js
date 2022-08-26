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
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, FormsIcon } from "../icons";

const CouponTable = () => {

    const [isError, setError] = useState(false);
    const [isDeleteSuccessfull, setDeleteSuccessfull] = useState(false);
    const [errorText, setErrorText] = useState("");



    const tableData = {
        // columns,
        // data,
      };

      const closeSuccessModal = () => {
        setDeleteSuccessfull(false);
      };

      const closeErrorModal = () => {
        setError(false);
      };

      
  return (
    <div>
      <PageTitle>Coupon List</PageTitle>
      <div className="">
        <Button
          //   iconRight={FormsIcon}
          tag={Link}
          to={`/app/CouponCodes`}
        >
          <span>Add Coupon</span>
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
        //   noHeader
        // //   columns={col}
        //   defaultSortField="title"
        //   defaultSortAsc={false}
        //   highlightOnHover
        //   pagination
        //   selectableRows
        //   initialState
        //   striped
        //   responsive
        //   onSelectedRowsChange={handleChange}
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

export default CouponTable;
