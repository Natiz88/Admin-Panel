import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Link, useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { addUser, updateUser, getUser } from "./../utils/demo/ApiCall";
import { TailSpin } from "react-loading-icons";
import { Input, HelperText, Label, Button, Modal } from "@windmill/react-ui";

function IndividualDetails() {
  const [res, setRes] = useState("");
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isPasswordSame, setPasswordSame] = useState(false);
  const [isUserAdded, setUserAdded] = useState(false);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");
  const [created, setCreated] = useState(false);

  const history = useHistory();

  useState(() => {
    getUser(id).then((response) => setUser(response));
  }, []);

  useEffect(() => {
    if (id > 0) {
      setName(user.name);
      setEmail(user.email);
      setContact(user.mobile_number);
      setAddress(user.address);
      setType(user.type);
    }
  }, [user]);

  const handleRadio = (e) => {
    setType(e.target.value);
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8 && e.target.value.length <= 16) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };
  const validateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
      setPasswordSame(true);
    } else {
      setPasswordSame(false);
    }
  };

  const updateUserHandler = (e) => {
    e.preventDefault();
    updateUser(id, name, address, contact, type)
      .then((res) => console.log("update-user", res))
      .catch((err) => console.log("errrorr", err));
    setTimeout(() => {
      setUserAdded(false);
      history.push("/app/tables");
    }, 1000);
    setUserAdded(true);
  };
  const addUserHandler = async (e) => {
    e.preventDefault();
    addUser(
      name,
      address,
      contact,
      password,
      confirmPassword,
      email,
      type
    ).then((res) => setRes(res));
    console.log(res);
    if (res.status === 201) {
      setTimeout(() => {
        setUserAdded(false);
        history.push("/app/tables");
      }, 1000);
      setUserAdded(true);
    }
  };

  console.log("user", user);
  return (
    <div>
      <PageTitle>User Details</PageTitle>
      {id > 0 && user.length <= 0 ? (
        <div className="mt-10 m-auto flex justify-center">
          <TailSpin stroke="black" width="200" height="50" />
        </div>
      ) : (
        <>
          <SectionTitle>{type} Account</SectionTitle>
          <Button tag={Link} to="/app/tables">
            Cancel
          </Button>
          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <Label>
              <span>Name</span>
              <Input
                className="mt-1"
                defaultValue={name}
                placeholder="Jane Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </Label>
            <Label className="mt-5">
              <span>Address</span>
              <Input
                className="mt-1"
                defaultValue={address}
                placeholder="kathmandu"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Label>
            <Label className="mt-5">
              <span>Email</span>
              <Input
                className="mt-1"
                type="email"
                defaultValue={email}
                placeholder="xyz@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Label>
            <Label className="mt-5">
              <span className="mt-5">Contact</span>
              <Input
                className="mt-1"
                defaultValue={contact}
                placeholder="9890239203"
                onChange={(e) => setContact(e.target.value)}
              />
            </Label>
            <div className="mt-4">
              <Label>Account Type</Label>
              <Label radio>
                <Input
                  type="radio"
                  value="individual"
                  name="accountType"
                  onClick={handleRadio}
                  // checked={type == "individual" ? "true" : "false"}
                />
                <span className="ml-2">individual</span>
              </Label>
              <Label className="ml-6" radio>
                <Input
                  type="radio"
                  value="corporate"
                  name="accountType"
                  onClick={handleRadio}
                  // checked={type == "corporate" ? "true" : "false"}
                />
                <span className="ml-2">corporate</span>
              </Label>
              <Label disabled className="ml-6" radio>
                <Input
                  disabled
                  type="radio"
                  value="disabled"
                  name="accountType"
                />
                <span className="ml-2">Admin</span>
              </Label>
            </div>

            {/* <div className="mt-4">
            <Label className="mt-5">Account Type</Label>
            <div className="mt-2">
              <Label className="ml-6" radio>
                <Input type="radio" name="accountType" checked />
                <span className="ml-2">Individual</span>
              </Label>
              <Label className="ml-6" radio>
                <Input type="radio" name="accountType" />
                <span className="ml-2">Corporate</span>
              </Label>
            </div>
          </div> */}
            {type === "corporate" && (
              <Label className="mt-5">
                <span>PAN</span>
                <Input
                  className="mt-1"
                  defaultValue={contact}
                  placeholder="9890239203"
                />
              </Label>
            )}
            <Label className="mt-5">
              <span>Password</span>
              <Input
                className="mt-1"
                type="password"
                valid={isPasswordValid}
                placeholder="********"
                onChange={validatePassword}
              />
              {!isPasswordValid && (
                <HelperText>
                  Invalid password length. please enter between 8-16 characters
                </HelperText>
              )}
            </Label>
            <Label className="mt-5">
              <span>Confirm Password</span>
              <Input
                className="mt-1"
                type="password"
                valid={isPasswordSame}
                placeholder="********"
                onChange={validateConfirmPassword}
              />
              {!isPasswordSame && (
                <HelperText>Passwords donot match.</HelperText>
              )}
            </Label>
            <Button
              onClick={id < 0 ? addUserHandler : updateUserHandler}
              className="m-auto mt-4"
            >
              {id < 0 ? "Add" : "Update"} User
            </Button>
          </div>
        </>
      )}
      <Modal isOpen={isUserAdded}>
        The user was {id < 0 ? "Added" : "Updated"}
      </Modal>
    </div>
  );
}

export default IndividualDetails;
