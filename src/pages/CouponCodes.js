import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import { useState } from "react";
import { useFormik } from "formik";
// import * from "yup";
// import { addCoupon } from "./../utils/demo/ApiCall";

import {
  Input,
  Form,
  HelperText,
  Label,
  Button,
  Select,
  Textarea,
} from "@windmill/react-ui";
import Toggle from "react-styled-toggle";
// import { view, TrashIcon, FormsIcon } from "../icons";
// import DataTableExtensions from "react-data-table-component-extensions";
// import DataTable from "react-data-table-component";

const CouponCodes = () => {
  // const [productChecked, setProductChecked] = useState(true);
  // const [product, setProduct] = useState(true);
  // const [shipping, setShipping] = useState(true);
  const [response, setResponse] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      range: "",
      discount: "",
      shipping: true,
      product: true,
    },
    // validationSchema:Yup.object({
    //   firstName:Yup.string()
    //     .max(15,"Must be 15 characters or less")
    //     .required("Required"),
    // }),
    
  });

  // const couponAddedSuccessfully = (res) => {
  //   setTimeout(() => {
  //     setUserAdded(false);
  //     history.push("/app/tables");
  //   }, 1000);
  //   setModalMessage("The Coupon Added Successfully");
  //   setUserAdded(true);
  // };

  console.log("data", formik.values);

  // const addCoupons = (e) => {
  //     e.preventDefault();
  //     setError(false);
  //     if(
  //       range === "" ||
  //       discount === "" ||
  //       shipping === true ||
  //       product === true
  //     ){
  //       setErrorMessage("Please fill up  all the fields");
  //       setError(true);
  //       return;
  //     }
  //     addCoupon(
  //       range,
  //       discount,
  //       shipping,
  //       product,
  //     )
  //       .then((res) => couponAddedSuccessfully())
  //       // .catch((err) => userAddedError(err));
  // };

  // const handleChange = (state) => {
  //   setSelected(state.selectedRows);
  // };

  // const columns = [
  //   {
  //     name: "Coupon Codes",
  //     cell: (row, idx) => idx + 1,
  //     sortable: false,
  //   },
  //   {
  //     name: "Discount",
  //     cell: (row) => row.name,
  //     sortable: true,
  //   },
  //   {
  //     name: "Shipping",
  //     cell: (row) => row.email,
  //     sortable: true,
  //   },
  //   {
  //     name: "Products",
  //     cell: (row) => row.mobile_number,
  //     sortable: true,
  //   },
  // ];

  // const data = response;
  // const tableData = {
  //   columns,
  //   data,
  // };

  return (
    <>
      {/* <DataTableExtensions {...tableData}>
        <DataTable
          noHeader
          defaultSortField="title"
          defaultSortAsc={false}
          highlightOnHover
          pagination
          selectableRows
          striped
          responsive
          onSelectedRowsChange={handleChange}
        />
      </DataTableExtensions>
      ; */}
       <PageTitle>Create Coupons</PageTitle>
      <form 
        onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}>

        <Label className="mt-4">
          <span>Coupon Code</span>
          <Input
            className="mt-1"
            placeholder="Business Card"
            // onChange={(e) => setproductName(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Discount</span>
          <Input
            className="mt-1"
            placeholder="Business Card"
            // onChange={(e) => setproductName(e.target.value)}
          />
        </Label>

        {/* <Label className="mt-4">
                  <span className="flex  font-bold">
                    Shipping
                  </span>
                  <Toggle
                    width="55"
                    height="20"
                    name="shipping"
                    // checked={shippingChecked}
                    // onChange={() => setShippingChecked(!shippingChecked)}
                    onChange={formik.handleChange}
                    value={formik.values.shipping}

                  />
                </Label> */}


        {/* <div className="border border-gray-500 p-2 mt-4">
          <div className="flex flex-col gap-1 justify-between md:flex-row">
            <div className="flex w-full md:w-1/2 justify-around">
              <div>
                <Label className="mt-4 w-4/5">
                  <span className="flex justify-center font-bold">
                    Coupon Code
                  </span>
                  <Input
                    name="range"
                    className="mt-1"
                    placeholder="100-200"
                    value={formik.values.range}
                    onChange={formik.handleChange}
                  />
                </Label>
              </div>
              <div>
                <Label className="mt-4 w-4/5">
                  <span className="flex justify-center font-bold">
                    Discount
                  </span>
                  <Input
                    name="discount"
                    className="mt-1"
                    placeholder="100-200"
                    onChange={formik.handleChange}
                    value={formik.values.discount}
                  />
                </Label>
              </div>
            </div>

            <div className="flex justify-around w-full md:w-1/2">
              <div>
                <Label className="mt-4 w-4/5">
                  <span className="flex justify-center font-bold">
                    Shipping
                  </span>
                  <Toggle
                    width="55"
                    height="20"
                    name="shipping"
                    // checked={shippingChecked}
                    // onChange={() => setShippingChecked(!shippingChecked)}
                    onChange={formik.handleChange}
                    value={formik.values.shipping}

                  />
                </Label>
              </div>

              <div className="">
                <Label className="mt-4 w-4/5 ">
                  <span className="flex justify-center font-bold ">
                    Products
                  </span>
                  {/* <Toggle width="80" height="30" checked={productChecked} onChange={()=>setProductChecked(!productChecked)}/> */}
                  {/* <Toggle
                    width="55"
                    height="20"
                    name="product"
                    // checked={productChecked}
                    // onChange={() => setProductChecked(!productChecked)}
                    onChange={formik.handleChange}
                    value={formik.values.product}

                  />
                </Label>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="mt-4">
              Add Coupons
            </Button>
          </div>
        </div> */} 
      </form>
    </>
  );
};

export default CouponCodes;
