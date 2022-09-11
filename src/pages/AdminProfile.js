import React from "react";
import { Input, Label, Select, Textarea, Button } from "@windmill/react-ui";
import photo from "./../utils/images/user.png";
import { useEffect, useState } from "react";
import { getAdminProfile, updateProfile } from "./../utils/demo/ApiCall";
import { withPrivateRoute } from "../utils/demo/WithPrivateRoute";

import PageTitle from "../components/Typography/PageTitle";

function AdminProfile() {
  const [response, setResponse] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState([]);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setError] = useState(false);
  const [img, setImg] = useState(photo);
  const [gender, setGender] = useState("");

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };
  const save = (e) => {
    e.preventDefault();
    console.log(name, email, mobile, email, description);
    setError(false);
    console.log(isError);
    if (name == "" || address == "" || mobile == "" || email == "") {
      setError(true);
      return;
    } else {
      updateProfile(response.id, name, address, mobile, gender)
        .then((res) => console.log("update", res))
        .catch((err) => console.log("update error", err));
    }
  };

  useEffect(() => {
    getAdminProfile()
      .then((res) => setResponse(res?.data || []))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setName(response.name);
    setMobile(response.mobile_number);
    setAddress(response.address);
    setEmail(response.email);
    setGender(response.gender);
  }, [response]);

  console.log("gender", gender);

  return (
    <>
      <PageTitle>Admin Profile</PageTitle>

      <form
        onSubmit={save}
        className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <div className=" border rounded h-40 flex justify-center items-center">
          <div className=" h-32 w-32 rounded-full relative">
            <label>
              <span>
                <img
                  className=" h-32 w-32 -z-10 rounded-full cursor-pointer "
                  src={img}
                  alt="pic"
                />
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageChange}
                />
              </span>
            </label>
          </div>
        </div>
        <Label className="mt-4">
          <span>Name</span>
          <Input
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </Label>

        <Label className="mt-4">
          <span>Address</span>
          <Input
            type="text"
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </Label>
        <Label className="mt-4">
          <span>Mobile number</span>
          <Input
            type="text"
            defaultValue={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="98********"
          />
        </Label>
        <Label className="mt-4">
          <span>Email</span>
          <Input
            disabled
            type="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="******@gmail.com"
          />
        </Label>
        <Label>Gender</Label>
        <div className="mt-4">
          <Label className="cursor-pointer" radio>
            <Input
              type="radio"
              value="male"
              name="Gender"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "male" ? true : false}
            />
            <span className="ml-2">male</span>
          </Label>
          <Label className=" ml-4 cursor-pointer" radio>
            <Input
              type="radio"
              value="female"
              name="Gender"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "female" ? true : false}
            />
            <span className="ml-2">female</span>
          </Label>
          <Label className="ml-4 cursor-pointer" radio>
            <Input
              type="radio"
              value="other"
              name="Gender"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "other" ? true : false}
            />
            <span className="ml-2">Other</span>
          </Label>
        </div>

        <Label className="mt-4">
          <span>Discription</span>
          <Textarea
            disabled
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write about you"
            row3="3"
            className="mt-1"
          />
        </Label>
        {isError && (
          <h1 className="text-red-500 my-3 flex justify-center">
            *PLease fill the required text field...!
          </h1>
        )}
        <label className="my-4 w-full  flex justify-center">
          <Button
            className="w-1/3"
            type="submit"
            // className="flex justify-center w-full hover:bg-blue-500 rounded font-serif text-2xl bg-orange-50">
          >
            Save{" "}
          </Button>
        </label>
      </form>
    </>
  );
}

export default withPrivateRoute(AdminProfile);
