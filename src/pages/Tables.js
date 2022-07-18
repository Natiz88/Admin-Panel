import React, { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../components/Typography/PageTitle";
import { TailSpin } from "react-loading-icons";
// import Modal from "react-responsive-modal";
import { useHistory, Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Input,
  Modal,
  Button,
  Pagination,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, FormsIcon } from "../icons";

function Tables() {
  const [response, setResponse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [data, setData] = useState("");
  const [id, setId] = useState(null);
  const [del, setDel] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState(false);
  const [pageTable, setPageTable] = useState(1);
  const resultsPerPage = 10;
  const totalResults = data.length;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

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
    setData(resp.data);
  };
  useEffect(() => {
    setResponse(
      data.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)
    );
  }, [data]);

  useEffect(() => {
    getData();
  }, [pageTable, del]);

  const deleteUser = (user) => {
    setId(user.id);
    setIsModalOpen(true);
  };

  const sendDeleteUser = async () => {
    const url = `http://192.168.1.98:8081/api/user/${id}/delete`;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(url, config);
    console.log("del-user", response);
    setDel(!true);
  };
  function closeModal() {
    setIsModalOpen(false);
  }
  const confirmDelete = () => {
    sendDeleteUser();
    setIsModalOpen(false);
    setTimeout(() => setAlertOpen(false), 1000);
    setAlertOpen(true);
  };
  const onSort = (event, sortKey) => {
    let dataCpy = [...data];

    if (sortType) {
      setData(dataCpy.sort((a, b) => a[sortKey] > b[sortKey]));
    } else {
      setData(dataCpy.sort((a, b) => b[sortKey] > a[sortKey]));
    }

    setSortType(!sortType);
  };

  const onSortNum = (event, sortKey) => {
    let dataCpy = [...data];

    if (sortType) {
      setData(dataCpy.sort((a, b) => a[sortKey] - b[sortKey]));
    } else {
      setData(dataCpy.sort((a, b) => b[sortKey] - a[sortKey]));
    }

    setSortType(!sortType);
  };

  const searchHandler = (e) => {
    setResponse(
      data.filter(
        (a) =>
          a.name.toLowerCase().includes(e.target.value) ||
          a.email.toLowerCase().includes(e.target.value) ||
          a.mobile_number.toLowerCase().includes(e.target.value) ||
          a.address.toLowerCase().includes(e.target.value)
      )
    );
  };

  return (
    <>
      <PageTitle className="text-center">Users</PageTitle>
      <Input
        type="text"
        className="my-4"
        placeholder="search user by name"
        onChange={searchHandler}
      />
      <div className="">
        <Button
          iconRight={FormsIcon}
          tag={Link}
          to={`/app/individualDetails/-1`}
        >
          <span>Create New User</span>
        </Button>
      </div>
      {response.length <= 0 ? (
        <div className="mt-10 m-auto">
          <TailSpin stroke="black" width="200" height="50" />
        </div>
      ) : (
        <>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>
                    <input
                      type="checkbox"
                      value="true"
                      className=""
                      // onChange={handleAllChecked}
                    />
                  </TableCell>
                  <TableCell>S.N.</TableCell>
                  <TableCell onClick={(e) => onSort(e, "name")}>Name</TableCell>
                  <TableCell onClick={(e) => onSort(e, "email")}>
                    Email
                  </TableCell>
                  <TableCell onClick={(e) => onSort(e, "address")}>
                    Address
                  </TableCell>
                  <TableCell onClick={(e) => onSort(e, "mobile_number")}>
                    Phone
                  </TableCell>
                  <TableCell onClick={(e) => onSort(e, "type")}>
                    User Type
                  </TableCell>
                  <TableCell onClick={(e) => onSort(e, "created_at")}>
                    Joined
                  </TableCell>
                  <TableCell>Update</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {response.map((user, i) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        value="true"
                        className=""
                        // checked={user.isChecked ? "checked" : ""}
                        // onChange={(event) =>
                        //   handleChecked(event, user, "isChecked")
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <p>{i + 1}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.email}</span>
                    </TableCell>
                    <TableCell>
                      <p>{user.address}</p>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.mobile_number}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.type}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.created_at}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                        ></Button>

                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Edit"
                          tag={Link}
                          to={`/app/individualDetails/${user.id}`}
                        >
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete">
                          <TrashIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                            onClick={() => deleteUser(user)}
                          />
                        </Button>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                          <ModalHeader>Delete User</ModalHeader>
                          <ModalBody>
                            Are you sure you want to delete the user?
                          </ModalBody>
                          <ModalFooter>
                            <div className="hidden sm:block">
                              <Button layout="outline" onClick={closeModal}>
                                Cancel
                              </Button>
                            </div>
                            <div className="hidden sm:block">
                              <Button onClick={confirmDelete}>
                                Ok, Continue
                              </Button>
                            </div>
                            <div className="block w-full sm:hidden">
                              <Button
                                block
                                size="large"
                                layout="outline"
                                onClick={closeModal}
                              >
                                Cancel
                              </Button>
                            </div>
                            <div className="block w-full sm:hidden">
                              <Button block size="large">
                                Accept
                              </Button>
                            </div>
                          </ModalFooter>
                        </Modal>
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
                onChange={onPageChangeTable}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
          {isAlertOpen && (
            <Modal isOpen={isAlertOpen}>
              The user was deleted successfully
            </Modal>
          )}
        </>
      )}
    </>
  );
}
export default Tables;
