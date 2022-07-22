import React from "react";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { columns, data } from "./../utils/demo/NewTableData";
import { getData, deleteUsers } from "./../utils/demo/ApiCall";

function NewTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      name: "S.N.",
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    // {
    //   name: "Update",
    //   selector: (row) => (
    //     <div className="flex items-center">
    //       <Button layout="link" size="icon" aria-label="Edit"></Button>

    //       <Button
    //         layout="link"
    //         size="icon"
    //         aria-label="Edit"
    //         tag={Link}
    //         to={`/app/individualDetails/${row.id}`}
    //       >
    //         <EditIcon className="w-5 h-5" aria-hidden="true" />
    //       </Button>
    //       <Button layout="link" size="icon" aria-label="Delete">
    //         <TrashIcon
    //           className="w-5 h-5"
    //           aria-hidden="true"
    //           onClick={() => deleteUser(row.id)}
    //         />
    //       </Button>
    //     </div>
    //   ),
    // },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.mobile_number,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "User Type",
      selector: (row) => row.type,
      sortable: true,
    },
    // {
    //   name: "Gender",
    //   selector: (row) => row.gender,
    //   sortable: true,
    // },
    {
      name: "Joined Date",
      selector: (row) => row.created_at,
      sortable: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  console.log("res", data);

  return (
    <DataTableExtensions {...tableData}>
      <DataTable
        noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />
    </DataTableExtensions>
  );
}

export default NewTable;
