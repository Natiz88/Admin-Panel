import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import { useState, useEffect } from "react";
import Logo from "./../utils/images/user.png";
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

function ContactUs() {
  const [response, setResponse] = useState([]);
  const [name, setName] = useState("");
  const [established, setEstablished] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [mobile, setMobile] = useState("");
  const [landline, setLandline] = useState("");
  const [email, setEmail] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [website, setWebsite] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalText, setIsModalText] = useState("");
  const [img, setImg] = useState(Logo);
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
      logo: "logo",
      name: name,
      estd: established,
      address: address,
      zip: zip,
      mobile_number: mobile,
      landline: landline,
      email: email,
      about_us: aboutUs,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedIn: linkedIn,
      website: website,
    };
    axios
      .put("http://192.168.1.98:8081/api/admin/about/1/update", data, config)
      .then(
        (response) => setIsModalText("Data was updated"),
        setTimeout(() => setIsModalOpen(false), 1000),
        setIsModalOpen(true)
      )
      .catch(
        (err) => setIsModalText(err.response.data.message),
        setTimeout(() => setIsModalOpen(false), 1000),
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
      .then((res) => setResponse(res.data[0]))
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    if (response.length !== undefined || response.length !== 0) {
      setName(response.name);
      setEstablished(response.estd);
      setAddress(response.address);
      setZip(response.zip);
      setMobile(response.mobile_number);
      setLandline(response.landline);
      setEmail(response.email);
      setAboutUs(response.about_us);
      setFacebook(response.facebook);
      setTwitter(response.twitter);
      setInstagram(response.instagram);
      setLinkedIn(response.linkedIn);
      setWebsite(response.website);
    }
  }, [response]);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };
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
        <div className="my-4 h-32 w-32 rounded-full relative flex justify-center">
          <label>
            <span>
              <img
                className=" h-32 w-32 -z-10 rounded-full cursor-pointer border-black border-2 "
                src={img}
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
        <Label>
          <span>Name</span>
          <Input
            className="mt-2"
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Established</span>
          <Input
            className="mt-2"
            value={established}
            onChange={(e) => setEstablished(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Address</span>
          <Input
            className="mt-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Zip</span>
          <Input
            className="mt-2"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Mobile Number</span>

          <Input
            value={mobile}
            className="mt-2"
            type="number"
            onChange={(e) => setMobile(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Landline</span>
          <Input
            type="number"
            className="mt-2"
            value={landline}
            onChange={(e) => setLandline(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Email</span>
          <Input
            type="email"
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>About Us</span>
          <Textarea
            className="mt-2"
            value={aboutUs}
            onChange={(e) => setAboutUs(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Facebook</span>
          <Input
            className="mt-2"
            type="url"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Twitter</span>
          <Input
            className="mt-2"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Instagram</span>
          <Input
            className="mt-2"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>LinkedIn</span>
          <Input
            className="mt-2"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Website</span>
          <Input
            className="mt-2"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
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
}

export default ContactUs;
