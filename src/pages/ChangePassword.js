import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import {
  Label,
  Modal,
  ModalBody,
  Button,
} from "@windmill/react-ui";
import axios from "axios";

function ChangePassword() {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalText, setIsModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show1, setShow1] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function showPassword3(e) {
    e.preventDefault();
    setShow3(!show3);
  }

  function showPassword2(e) {
    e.preventDefault();
    setShow2(!show2);
  }

  function showPassword1(e) {
    e.preventDefault();
    setShow1(!show1);
  }



  
  const updatePasswordHandler = (e) => {
    e.preventDefault();
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      setTimeout(() => {
        setIsEmpty(false);
      }, 2000);
      setIsEmpty(true);
      return;
    }

    // const token = '1N3qD4Vb9K2t6BkuPAausfJsy4b7TH5WsZT9i6HD'; 
    const token = localStorage.getItem("token");


    
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      old_password: oldPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    };

    axios
      .post(
        "http://192.168.100.21:8081/api/profile/change-password",
        data,
        config
      )
      .then(
        (res) => setIsModalText("Data was Updated."),
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000),
        setIsModalOpen(true),
      )
      .catch(
        (err) => setIsModalText(err.response.data.message),
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000),
        setIsModalOpen(true)
      );
  };

  return (
    <>
      <PageTitle>Update Your Password</PageTitle>
      <div className="flex justify-center">
        <form
          onSubmit={updatePasswordHandler}
          className="flex items-center justify-center p-6 sm:p-12 md:w-1/2"
        >
          <div className="w-full">
            <Label className="relative">
              <span>Old Password</span>
              <div className="relative text-gray-500 focus-within:text-purple-600">
                <input
                  type={show1 === true ? "text" : "password" }
                  
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                />
                <button
                  onClick={showPassword1}
                  className="absolute inset-y-0 right-0 px-4 text-sm focus:outline-none"
                >
                  {show1 === false ? (
                    <AiOutlineEyeInvisible className="text-black dark:text-white" />
                  ) : (
                    <AiOutlineEye className="text-black dark:text-white" />
                  )}
                </button>
              </div>
            </Label>
            <Label className="relative mt-4">
              <span>New Password</span>
              <div className="relative text-gray-500 focus-within:text-purple-600">
                <input
                  type={show2 === true ? "text" : "password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                />
                <button
                  onClick={showPassword2}
                  className="absolute inset-y-0 right-0 px-4 text-sm focus:outline-none"
                >
                  {show2 === false ? (
                    <AiOutlineEyeInvisible className="text-black dark:text-white" />
                  ) : (
                    <AiOutlineEye className="text-black dark:text-white" />
                  )}
                </button>
              </div>
            </Label>
            <Label className="relative mt-4">
              <span>Confirm Password</span>
              <div className="relative text-gray-500 focus-within:text-purple-600">
                <input
                  type={show3 === true ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                />
                <button
                  onClick={showPassword3}
                  className="absolute inset-y-0 right-0 px-4 text-sm focus:outline-none"
                >
                  {show3 === false ? (
                    <AiOutlineEyeInvisible className="text-black dark:text-white" />
                  ) : (
                    <AiOutlineEye className="text-black dark:text-white" />
                  )}
                </button>
              </div>
            </Label>

            {isEmpty && (
              <h1 className="mt-4 text-red-500">The input fields are empty.</h1>
            )}

            <div className="flex justify-center">
              <Button className="mt-4" type="submit">
                Update Password
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalBody>{isModalText}</ModalBody>
        </Modal>
      </div>
    </>
  );
}
export default ChangePassword;
