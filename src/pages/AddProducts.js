import React from "react";
import axios from "axios";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {
  Input,
  Label,
  Button,
  Select,
  Textarea,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import { useState, useEffect } from "react";
import uploadImage from "./../assets/img/upload_pic.png";
import { tableData } from "./TableData";
import { Link } from "react-router-dom";
import { EditIcon, TrashIcon, FormsIcon } from "../icons";
import { modes } from "react-transition-group/SwitchTransition";

// import {Switch} from "react-button-switch";

// import { MailIcon } from "../icons";

function AddProducts() {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const [categories, setCategories] = useState([]);
  // const [change,setchange] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productName, setproductName] = useState();
  const [img, setImg] = useState(uploadImage);
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

  const [isPriceModalOpen, setPriceModalOpen] = useState(false);
  const [isAttributeModalOpen, setAttributeModalOpen] = useState(false);
  const [isModalText, setIsModalText] = useState("");
  const [response, setResponse] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [tableErrorMsg, setTableErrorMsg] = useState("");

  function closeModal() {
    setPriceModalOpen(false);
    setAttributeModalOpen(false);
    setEditMode(false);
    setIndPriceList({
      qty: "",
      normal: "",
      urgent: "",
      dicount: "",
      type: "individual",
    });
    setCorPriceList({
      qty: "",
      normal: "",
      urgent: "",
      dicount: "",
      type: "corporate",
    });
    setAttributes({ attribute: "", value: "" });
  }

  const [attributes, setAttributes] = useState({ attribute: "", value: "" });
  const [tableAttributeData, setTableAttributeData] = useState([]);

  const [tablePriceData, setTablePriceData] = useState([]);
  const [indPricelist, setIndPriceList] = useState({
    qty: null,
    normal: null,
    urgent: null,
    discount: null,
    type: "individual",
  });
  const [corPricelist, setCorPriceList] = useState({
    qty: null,
    normal: null,
    urgent: null,
    discount: null,
    type: "corporate",
  });

  // const getCategories = () => {
  //   console.log("CATEGORIES CALLED");
  //   const url = "http://192.168.100.21:8081/api/category/list";
  //   const token = localStorage.getItem("token");
  //   const config = {
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   };
  //   axios
  //     .get("http://192.168.100.17:8081/api/category/list", config)
  //     .then((response) => setCategories(response?.data?.data))
  //     .catch((err) => console.log("error", err));
  // };
  // const getSubCategories = (e) => {
  //   const id = e.target.value;
  //   console.log("subCATEGORIES CALLED");
  //   const url = `http://192.168.100.21:8081/api/category/${id}`;
  //   const token = localStorage.getItem("token");
  //   const config = {
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   };
  //   axios
  //     .get(`http://192.168.100.17:8081/api/category/${id}`, config)
  //     .then((response) => setSubCategories(response?.data?.children))
  //     .catch((err) => console.log("error", err));
  // };

  // useEffect(() => {
  //   getCategories();
  // }, []);

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
      .post("http://192.168.100.17:8081/api/product/add", data, config)
      .then(
        (response) => setIsModalText("Product added Successfully"),
        setPriceModalOpen(true)
      )
      .catch(
        (err) => setIsModalText(err?.response?.data?.message),
        setPriceModalOpen(true)
      );
  };

  const [pageTable1, setPageTable1] = useState(1);
  const [dataTable1, setDataTable1] = useState([]);
  const resultsPerPage = 10;
  const totalResults = response.length;

  const delAttributeRow = (obj) => {
    setTableAttributeData(
      tableAttributeData.filter((data) => data.attribute !== obj.attribute)
    );
  };

  const delPriceRow = (range) => {
    setTablePriceData(tablePriceData.filter((price) => price.qty !== range));
  };

  const editAttributeRow = (obj) => {
    setEditMode(true);
    const attr = tableAttributeData.filter(
      (data) => data.attribute === obj.attribute
    )[0];
    setAttributes({ attribute: attr.attribute, value: attr.value });
    setAttributeModalOpen(true);
  };

  const editPriceRow = (obj) => {
    const a = tablePriceData.filter(
      (price) => price.qty === obj.qty && price.type === "individual"
    )[0];
    const cor = tablePriceData.filter(
      (price) => price.qty === obj.qty && price.type === "corporate"
    )[0];
    setIndPriceList({
      qty: a.qty,
      normal: a.normal,
      urgent: a.urgent,
      discount: a.discount,
      type: "individual",
    });
    setCorPriceList({
      qty: a.qty,
      normal: cor.normal,
      urgent: cor.urgent,
      discount: cor.discount,
      type: "corporate",
    });
    setPriceModalOpen(true);
  };

  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  // useEffect(() => {
  //   setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  // }, [pageTable1])

  // const addToPriceTable = (data) =>{
  //   console.log("table",data)
  // }
  const checkAttributeTable = () => {
    const isPresent = tableAttributeData.filter(
      (data) => data.attribute === attributes.attribute
    );
    return isPresent.length > 0 ? true : false;
  };
  const pushToAttributeTable = () => {
    setTableErrorMsg("");
    const isPresent = checkAttributeTable();
    if (!editMode && isPresent) {
      setTableErrorMsg("Attribute already present in the table");
      return;
    } else if (!editMode) {
      setTableAttributeData([...tableAttributeData, attributes]);
      setAttributes({ attribute: "", value: "" });

      // edit mode
    } else {
      setTableAttributeData(
        tableAttributeData.map((object) => {
          if (object.attribute === attributes.attribute) {
            return { attribute: attributes.attribute, value: attributes.value };
          }
          return object;
        })
      );
    }
    setAttributeModalOpen(false);
    setEditMode(false);
  };

  const pushToTable = () => {
    console.log(indPricelist.qty);
    const isPresent = tablePriceData.filter(
      (data) => data.qty === indPricelist.qty
    );
    if (isPresent.length > 0) {
      console.log("delet", isPresent);
      setTablePriceData(
        tablePriceData.filter((data) => data.qty !== indPricelist.qty)
      );
      console.log("table", tablePriceData);
    }
    pushToCheck();
  };
  const pushToCheck = () => {
    setTablePriceData([...tablePriceData, indPricelist, corPricelist]);
    setIndPriceList({
      qty: "",
      normal: "",
      urgent: "",
      dicount: "",
      type: "individual",
    });
    setCorPriceList({
      qty: "",
      normal: "",
      urgent: "",
      dicount: "",
      type: "corporate",
    });
    setPriceModalOpen(false);
  };

  const setRange = (e) => {
    setIndPriceList({ ...indPricelist, qty: e.target.value });
    setCorPriceList({ ...corPricelist, qty: e.target.value });
  };

  return (
    <div>
      <PageTitle>Add Products</PageTitle>
      <SectionTitle>Product Details</SectionTitle>

      <Button tag={Link} to="/app/productList">
        Cancel
      </Button>

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
          <span>Image</span>
        </Label>
        <div className="my-4 h-32 w-32 rounded-full relative">
          <label>
            <span>
              <img
                className=" h-32 w-32 -z-10 cursor-pointer"
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
        <Label className="mt-4">
          <span>Description</span>
          <Textarea
            className="mt-1"
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Label>
        <Label className="mt-4">
          <span>Sub-Category</span>
          <Select className="mt-1">
            <option value=""></option>
            {/* {subCategories.map((e) => (
              <option value={e.id}>{e.name}</option>
            ))} */}
          </Select>
        </Label>

        <div className="border-2 border-gray-300 my-4">
          <Modal isOpen={isAttributeModalOpen} onClose={closeModal}>
            <div>
              <Label className="mt-4 w-4/5">
                <span className="flex justify-center font-bold">Attribute</span>
                <Input
                  className="mt-1"
                  placeholder="Size"
                  defaultValue={attributes.attribute}
                  disabled={editMode ? true : false}
                  onChange={(e) =>
                    setAttributes({ ...attributes, attribute: e.target.value })
                  }
                />
              </Label>
            </div>
            <div>
              <Label className="mt-4 w-4/5">
                <span className="flex justify-center font-bold">Value</span>
                <Input
                  className="mt-1"
                  placeholder="A4"
                  defaultValue={attributes.value}
                  onChange={(e) =>
                    setAttributes({ ...attributes, value: e.target.value })
                  }
                />
              </Label>
            </div>
            <Label className="text-red-400">{tableErrorMsg}</Label>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="mt-4"
                onClick={pushToAttributeTable}
              >
                Add To Table
              </Button>
            </div>
          </Modal>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Attribute</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {tableAttributeData.map((list, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{list.attribute}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{list.value}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                        ></Button>

                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                          onClick={() => editAttributeRow(list)}

                          // tag={Link}
                          // to={`/app/individualDetails/${row.id}`}
                        >
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete">
                          <TrashIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                            onClick={() => delAttributeRow(list)}
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="w-full flex justify-center items-center mb-2">
            <Button onClick={() => setAttributeModalOpen(true)}>
              Add Attribute
            </Button>
          </div>
        </div>
        <div className="border-2 border-gray-300 my-4">
          <Modal isOpen={isPriceModalOpen} onClose={closeModal}>
            {/* <ModalHeader>Delete User</ModalHeader>
            <ModalBody>Are you sure you want to delete the user?</ModalBody>
            <ModalFooter>
              <div className="hidden sm:block">
                <Button layout="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button>Add Price</Button>
              </div>
            </ModalFooter> */}
            <div className="p-2 mt-4">
              <h1 className="font-bold text-red-500">
                Price List (Individual Account)
              </h1>

              <div className="flex flex-col gap-1 justify-between  md:flex-row">
                <div className="flex w-full md:w-1/2 justify-around">
                  <div>
                    <Label className="mt-4 w-4/5">
                      <span className="flex justify-center font-bold">
                        Range
                      </span>
                      <Input
                        className="mt-1"
                        placeholder="100-200"
                        defaultValue={indPricelist.qty}
                        onChange={(e) => setRange(e)}
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
                        defaultValue={indPricelist.normal}
                        onChange={(e) =>
                          setIndPriceList({
                            ...indPricelist,
                            normal: e.target.value,
                          })
                        }
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
                        defaultValue={indPricelist.urgent}
                        onChange={(e) =>
                          setIndPriceList({
                            ...indPricelist,
                            urgent: e.target.value,
                          })
                        }
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
                        defaultValue={indPricelist.discount}
                        onChange={(e) =>
                          setIndPriceList({
                            ...indPricelist,
                            discount: e.target.value,
                          })
                        }
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
                          Range
                        </span>
                        <Input
                          className="mt-1"
                          placeholder="100-200"
                          defaultValue={indPricelist.qty}
                          value={indPricelist.qty}
                          // onChange={(e) => setCorPriceList({...indPricelist,qty:e.target.value})}
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
                          defaultValue={corPricelist.urgent}
                          onChange={(e) =>
                            setCorPriceList({
                              ...corPricelist,
                              normal: e.target.value,
                            })
                          }
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
                          defaultValue={corPricelist.urgent}
                          onChange={(e) =>
                            setCorPriceList({
                              ...corPricelist,
                              urgent: e.target.value,
                            })
                          }
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
                          defaultValue={corPricelist.discount}
                          onChange={(e) =>
                            setCorPriceList({
                              ...corPricelist,
                              discount: e.target.value,
                            })
                          }
                        />
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button type="submit" className="mt-4" onClick={pushToTable}>
                  Add To Table
                </Button>
              </div>
            </div>
          </Modal>

          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Quantity Range</TableCell>
                  <TableCell>Normal Price</TableCell>
                  <TableCell>Urgent Price</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {tablePriceData.map((list, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">$ {list.qty}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">$ {list.normal}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">$ {list.urgent}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{list.discount}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        type={
                          list.type === "individual" ? "success" : "primary"
                        }
                      >
                        {list.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                        ></Button>

                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                          onClick={() => editPriceRow(list)}

                          // tag={Link}
                          // to={`/app/individualDetails/${row.id}`}
                        >
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete">
                          <TrashIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                            onClick={() => delPriceRow(list.qty)}
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={onPageChangeTable1}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
          <div className="w-full flex justify-center items-center mb-2">
            <Button onClick={() => setPriceModalOpen(true)}>Add Price</Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit" className="mt-4" onClick={addproduct}>
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
