import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function data() {
  const [data, setData] = useState("");
  useEffect(() => {
    const url = "http://192.168.100.21:8081/api/user";
    const token = "7|VQaqMdc9fsut7C59mXyJZ1iabyKvE31cDfXDIS4m";
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, config)
      .then((res) => setData(res.data))
      .catch((err) => console.warn(err));
  });
}

export default data;
