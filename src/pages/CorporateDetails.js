import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import { getData } from "../utils/demo/ApiCall";

const columns = [
  {
    id: 1,
    name: "Title",
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Director",
    selector: (row) => row.email,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Runtime (m)",
    selector: (row) => row.address,
    sortable: true,
    right: true,
    reorder: true,
  },
];

function CorporateDetails() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const url = "http://192.168.1.98:8081/api/user";
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.get(url, config);
    console.log("resp", resp);
    setData(resp.data);
    // setResponse(
    //   resp.data.slice(
    //     (pageTable - 1) * resultsPerPage,
    //     pageTable * resultsPerPage
    //   )
    // );
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div>
      <DataTable
        title="Movies"
        columns={columns}
        data={data}
        defaultSortFieldId={2}
        // sortIcon={<SortIcon />}
        pagination
        selectableRows
      />
    </div>
  );
}

export default CorporateDetails;
