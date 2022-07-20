import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import { useState } from "react";
import {
  Input,
  ModalHeader,
  ModalBody,
  Modal,
  ModalFooter,
  Label,
  Textarea,
  Button,
} from "@windmill/react-ui";
import axios from "axios";
// import Photo from './user.png'
import { useEffect } from "react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [esta, setEsta] = useState("");
  const [add, setAdd] = useState("");
  const [zip, setZip] = useState("");
  const [mob, setMob] = useState("");
  const [lan, setLan] = useState("");
  const [email, setEmail] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twit, setTwit] = useState("");
  const [inst, setInst] = useState("");
  const [link, setLink] = useState("");
  const [web, setWeb] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalText, setIsModalText] = useState("");
  const [response, setResponse] = useState("");
  const [img, setImg] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  const sendHandler = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("img", img);

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    };
    let data = {
      logo: "formData",
      name: name,
      estd: esta,
      address: add,
      zip: zip,
      mobile_number: mob,
      landline: lan,
      email: email,
      about_us: aboutUs,
      facebook: facebook,
      twitter: twit,
      instagram: inst,
      linkedIn: link,
      website: web,
    };
    console.log(data);
    axios
      .put("http://192.168.1.98:8081/api/admin/about/1/update", data, config)
      .then(
        (response) => setIsModalText("Data was updated"),
        setIsModalOpen(true)
      )
      .catch(
        (err) => setIsModalText(err.response.data.message),
        setIsModalOpen(true)
      );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://192.168.1.98:8081/api/about", config)
      .then((response) => setResponse(response.data[0]))
      .catch((err) => console.log(err.response.data.message));
  }, []);
  console.log(response);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };
  console.log(response);
  return (
    <>
      <PageTitle>Contact Us</PageTitle>
      <form
        onSubmit={sendHandler}
        className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <Label>
          <span>Logo</span>
        </Label>
        <div className="my-4 h-32 w-32 rounded-full relative">
          <label>
            <span>
              <img
                className=" h-32 w-32 -z-10 rounded-full cursor-pointer "
                src={response.logo}
                alt="pic"
              />
              <Input
                type="file"
                accept="image/*"
                class="hidden"
                onChange={onImageChange}
              />
            </span>
          </label>
        </div>
        <Label>
          <span>Name</span>
          <Input
            className="mt-2"
            type="text"
            defaultValue={response.name}
            onChange={(e) => setName(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Established</span>
          <Input
            className="mt-2"
            defaultValue={response.created_at}
            onChange={(e) => setEsta(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Address</span>
          <Input
            className="mt-2"
            defaultValue={response.address}
            onChange={(e) => setAdd(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Zip</span>
          <Input
            className="mt-2"
            defaultValue={response.zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Mobile Number</span>

          <Input
            defaultValue={response.mobile_number}
            className="mt-2"
            type="number"
            onChange={(e) => setMob(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Landline</span>
          <Input
            type="number"
            className="mt-2"
            defaultValue={response.landline}
            onChange={(e) => setLan(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Email</span>
          <Input
            type="email"
            className="mt-2"
            defaultValue={response.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>About Us</span>
          <Textarea
            className="mt-2"
            defaultValue={response.about_us}
            onChange={(e) => setAboutUs(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Facebook</span>
          <Input
            className="mt-2"
            type="url"
            defaultValue={response.facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Twitter</span>
          <Input
            className="mt-2"
            type="url"
            defaultValue={response.twitter}
            onChange={(e) => setTwit(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Instagram</span>
          <Input
            className="mt-2"
            type="url"
            defaultValue={response.instagram}
            onChange={(e) => setInst(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>LinkedIn</span>
          <Input
            className="mt-2"
            type="url"
            defaultValue={response.linkedIn}
            onChange={(e) => setLink(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Website</span>
          <Input
            className="mt-2"
            type="url"
            defaultValue={response.website}
            onChange={(e) => setWeb(e.target.value)}
          />
        </Label>
        {isEmpty && <h1>The field is empty</h1>}

        <Button
          className="px-4 py-3 mt-8 rounded-lg shadow-md dark:bg-gray-200"
          type="submit"
        >
          Send
        </Button>
      </form>
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalBody>{isModalText}</ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default ContactUs;
