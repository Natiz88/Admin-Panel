import axios from "axios";

const token = localStorage.getItem("token");

export const deleteAllUsers = async (arr) => {
<<<<<<< HEAD
  const url = "http://192.168.100.21:8081/api/admin/deleteAllUser";
=======
  const url = "http://192.168.100.17:8081/api/admin/deleteAllUser";
>>>>>>> 786caa1a37a84e05bdce8455ca8c963320431595
  console.log("url", url);
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    id: arr,
  };
  const resp = await axios.post(url, data, config);
  return resp;
};

export const loginData = async (email, password) => {
  const url = "http://192.168.100.17:8081/api/login";
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const data = {
    email: email,
    password: password,
    device_name: "acer",
  };
  const resp = await axios.post(url, data, config);
  return resp.data;
};

export const getData = async () => {
  const url = "http://192.168.100.17:8081/api/admin/user";
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
  const url = `http://192.168.100.17:8081/api/admin/user/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const resp = await axios.get(url, config);
  return resp.data;
};

export const updateUser = async (
  id,
  name,
  address,
  gender,
  mobile_number,
  type
) => {
  const url = `http://192.168.100.17:8081/api/admin/user/${id}/update`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    name: name,
    address: address,
    gender: gender,
    mobile_number: mobile_number,
    type: type,
    is_admin: false,
  };
  const resp = await axios.put(url, data, config);
  return resp;
};

export const deleteUsers = async (id) => {
  const url = `http://192.168.100.17:8081/api/admin/user/${id}/delete`;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const resp = await axios.delete(url, config);
  return resp;
};

export const addUser = async (
  name,
  address,
  gender,
  mobile_number,
  password,
  password_confirmation,
  email,
  type,
  pan
) => {
  const url = "http://192.168.100.17:8081/api/signup";
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
    gender: gender,
    mobile_number: mobile_number,
    password: password,
    password_confirmation: password_confirmation,
    email: email,
    type: type,
    pan: pan,
    is_admin: false,
  };
  const resp = await axios.post(url, data, config);
  return resp;
};

<<<<<<< HEAD
export const addCoupon = async (
  range,
  discount,
  product,
  shipping
) => {
  const url = "http://192.168.100.17:8081/api/signup";
  console.log("url", url);
=======
export const updateProfile = async (name, address, mobile, gender) => {
  const url = "http://192.168.100.17:8081/api/profile/update";
>>>>>>> 786caa1a37a84e05bdce8455ca8c963320431595
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
<<<<<<< HEAD
    name: range,
    address: discount,
    gender: product,
    mobile_number: shipping
  };
  console.log("data", data);
  const resp = await axios.post(url, data, config);
  return resp;
};
=======
    name: name,
    address: address,
    mobile_number: mobile,
    gender: gender,
  };
  const resp = await axios.put(url, data, config);
  return resp;
};

export const getAdminProfile = async () => {
  const url = "http://192.168.100.17:8081/api/profile";
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(url, config);
  return response;
};
>>>>>>> 786caa1a37a84e05bdce8455ca8c963320431595
