import React from "react";
import axios from "axios";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {
  Input,
  Form,
  HelperText,
  Label,
  Button,
  Select,
  Textarea,
} from "@windmill/react-ui";
import { useState, useEffect } from "react";
import { tableData } from "./TableData";
// import {Switch} from "react-button-switch";

// import { MailIcon } from "../icons";

function Forms() {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const [categories, setCategories] = useState([]);
  // const [change,setchange] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productName, setproductName] = useState();
  const [img, setImg] = useState(null);
  const [desc, setDesc] = useState();
  // const [email, setEmail] = useState()
  const [subCategory, setSubCategory] = useState();
  const [size, setSize] = useState();
  const [paperWeight, setPaperWeight] = useState();
  const [lamination, setLamination] = useState();
  const [weight, setWeight] = useState();
  const [quantityRange, setQuantityRange] = useState();
  const [normalPrice, setNormalPrice] = useState();
  const [urgentPrice, setUrgentPrice] = useState();
  const [disc, setDisc] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalText, setIsModalText] = useState("");
  const [response, setResponse] = useState("");

  const [productChecked,setProductChecked] = useState(true)
  const [shippingChecked,setShippingChecked] = useState(true)

  const getCategories = () => {
    console.log("CATEGORIES CALLED");
    const url = "http://192.168.100.21:8081/api/category/list";
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    axios
      .get("http://192.168.100.17:8081/api/category/list", config)
      .then((response) => setCategories(response?.data?.data))
      .catch((err) => console.log("error", err));
  };
  const getSubCategories = (e) => {
    const id = e.target.value;
    console.log("subCATEGORIES CALLED");
    const url = `http://192.168.100.21:8081/api/category/${id}`;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    axios
      .get(`http://192.168.100.17:8081/api/category/${id}`, config)
      .then((response) => setSubCategories(response?.data?.children))
      .catch((err) => console.log("error", err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  // console.log(desc);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const addproduct = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    };

    let data = {
      name: productName,
      desc: desc,
      category_Id: category,
      subCategory: subCategory,
      size: size,
      paperWeight: paperWeight,
      lamination: lamination,
      weight: weight,
      quantityRange: quantityRange,
      normalPrice: normalPrice,
      urgentPrice: urgentPrice,
      disc: disc,
    };

    axios
      .post("http://192.168.1.98:8081/api/product", data, config)
      .then(
        (response) => setIsModalText("Product added Successfully"),
        setIsModalOpen(true)
      )
      .catch(
        (err) => setIsModalText(err.response.data.message),
        setIsModalOpen(true)
      );
  };
  console.log("category", subCategories);
  console.log("check", productChecked);

  return (
    <>
      <PageTitle>Add Products</PageTitle>
      <SectionTitle>Product Details</SectionTitle>
      {/* <Button onClick={getCategories}>get categories</Button> */}

      <form
        onSubmit={submitHandler}
        className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <Label className="mt-4">
          <span>Product Name</span>
          <Input
            className="mt-1"
            placeholder="Business Card"
            onChange={(e) => setproductName(e.target.value)}
          />
        </Label>

        <Label>
          <span>Logo</span>
        </Label>
        <div className="my-4 h-32 w-32 rounded-full relative">
          <label>
            <span>
              <img
                className=" h-32 w-32 -z-10 cursor-pointer bg-red-400"
                src={response.logo}
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

        <Label className="mt-4">
          <span>Description</span>
          <Textarea
            className="mt-1"
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Label>
        {/* <Label className="mt-4">
          <span>Email</span>
          <Input type="email" className="mt-1" placeholder="Jane Doe" />
        </Label> */}

        <Label className="mt-4">
          <span>Category</span>
          <Select className="mt-1" onChange={(e) => getSubCategories(e)}>
            <option value=""></option>
            {categories.map((e) => (
              <option value={e.id}>{e.name}</option>
            ))}
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Sub-Category</span>
          <Select className="mt-1">
            <option value=""></option>
            {subCategories.map((e) => (
              <option value={e.id}>{e.name}</option>
            ))}
          </Select>
        </Label>

        <div className=" mt-3 mb-6 flex flex-col gap-1 justify-between md:flex-row">
          <div className="flex w-full md:w-1/2 justify-around">
            <div>
              <Label className="mt-4 w-4/5">
                <span className="flex justify-center font-bold">Size</span>
                <Input
                  className="mt-1"
                  placeholder="10*20 px"
                  onChange={(e) => setSize(e.target.value)}
                />
              </Label>
            </div>
            <div>
              <Label className="mt-4 w-4/5">
                <span className="flex justify-center font-bold">
                  Paper Weight
                </span>
                <Input
                  className="mt-1"
                  placeholder="5 gms"
                  onChange={(e) => setPaperWeight(e.target.value)}
                />
              </Label>
            </div>
          </div>

          <div className="flex justify-around w-full md:w-1/2">
            <div>
              <Label className="mt-4 w-4/5">
                <span className="flex justify-center font-bold">
                  Lamination
                </span>
                <Input
                  className="mt-1"
                  onChange={(e) => setLamination(e.target.value)}
                />
              </Label>
            </div>

            <div>
              <Label className="mt-4 w-4/5">
                <span className="flex justify-center font-bold">Weight</span>
                <Input
                  className="mt-1"
                  placeholder="700 gms"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Label>
            </div>
          </div>
        </div>

        <div className="border border-gray-500 p-2 mt-4">
          {/* <table>
            <tr className="flex text-gray-500">
              <th>Quantity Range</th>
              <th>Normal Price</th>
              <th>Urgent Price</th>
              <th>Discount</th>
            </tr>
            {tableData.map((value,key)=>{
              return(
                <tr key={key}>
                  <td>{value.quantityRange}</td>
                  <td>{value.normalPrice}</td>
                  <td>{value.urgentPrice}</td>
                  <td>{value.discount}</td>
                </tr>
              )
            })}
          </table> */}

          <h1 className="font-bold text-red-500">
            Price List (Individual Account)
          </h1>

          <div className="flex flex-col gap-1 justify-between md:flex-row">
            <div className="flex w-full md:w-1/2 justify-around">
              <div>
                <Label className="mt-4 w-4/5">
                  <span className="flex justify-center font-bold">
                    Quantity Range
                  </span>
                  <Input
                    className="mt-1"
                    placeholder="100-200"
                    onChange={(e) => setQuantityRange(e.target.value)}
                  />
                </Label>
              </div>
              <div>
                <Label className="mt-4 w-4/5">
                  <span className="flex justify-center font-bold">
                    Normal Price
                  </span>
                  <Input
                    className="mt-1"
                    placeholder="5"
                    onChange={(e) => setNormalPrice(e.target.value)}
                  />
                </Label>
              </div>
            </div>

            <div className="flex justify-around w-full md:w-1/2">
              <div>
                <Label className="mt-4 w-4/5">
                  <span className="flex justify-center font-bold">
                    Urgent Price
                  </span>
                  <Input
                    className="mt-1"
                    placeholder="10"
                    onChange={(e) => setUrgentPrice(e.target.value)}
                  />
                </Label>
              </div>

              <div>
                <Label className="mt-4 w-4/5">
                  <span className="flex justify-center font-bold">
                    Discount
                  </span>
                  <Input
                    className="mt-1"
                    placeholder="5%"
                    onChange={(e) => setDisc(e.target.value)}
                  />
                </Label>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="font-bold text-red-500">
              Price List(Corporate Account)
            </h1>
            <div className="flex flex-col gap-1 justify-between md:flex-row">
              <div className="flex w-full md:w-1/2 justify-around">
                <div>
                  <Label className="mt-4 w-4/5">
                    <span className="flex justify-center font-bold">
                      Quantity Range
                    </span>
                    <Input
                      className="mt-1"
                      placeholder="100-200"
                      onChange={(e) => setQuantityRange(e.target.value)}
                    />
                  </Label>
                </div>
                <div>
                  <Label className="mt-4 w-4/5">
                    <span className="flex justify-center font-bold">
                      Normal Price
                    </span>
                    <Input className="mt-1" placeholder="5" setNormalPrice />
                  </Label>
                </div>
              </div>

              <div className="flex justify-around w-full md:w-1/2">
                <div>
                  <Label className="mt-4 w-4/5">
                    <span className="flex justify-center font-bold">
                      Urgent Price
                    </span>
                    <Input className="mt-1" placeholder="10" setUrgentPrice />
                  </Label>
                </div>

                <div>
                  <Label className="mt-4 w-4/5">
                    <span className="flex justify-center font-bold">
                      Discount
                    </span>
                    <Input className="mt-1" placeholder="5%" setDisc />
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="mt-4">
              Add More List
            </Button>
          </div>
        </div>

        

        <div className="flex justify-center">
          <Button type="submit" className="mt-4" onClick={addproduct}>
            Add Product
          </Button>
        </div>
      </form>
    </>
  );
}

export default Forms;
