import axios from "axios";

const token = localStorage.getItem("token");

export const getData = async () => {
  const url = "http://192.168.1.98:8081/api/user";
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const resp = await axios.get(url, config);
  return resp.data;
};

export const getUser = async (id) => {
  const url = `http://192.168.1.98:8081/api/user/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const resp = await axios.get(url, config);
  return resp.data;
};

export const updateUser = async (id, name, address, mobile_number, type) => {
  const url = `http://192.168.1.98:8081/api/user/${id}/update`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    name: name,
    address: address,
    mobile_number: mobile_number,
    type: type,
    is_admin: false,
  };
  const resp = await axios.put(url, data, config);
  return resp;
};

export const addUser = async (
  name,
  address,
  mobile_number,
  password,
  password_confirmation,
  email,
  type,
  pan
) => {
  const url = "http://192.168.1.98:8081/api/signup";
  console.log("url", url);
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    name: name,
    address: address,
    mobile_number: mobile_number,
    password: password,
    password_confirmation: password_confirmation,
    email: email,
    type: type,
    pan: pan,
    is_admin: false,
  };
  console.log("data", data);
  const resp = await axios.post(url, data, config);
  return resp;
};
