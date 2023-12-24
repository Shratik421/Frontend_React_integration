

import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Crud = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(0);

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [isEditActive, setIsEditActive] = useState(0);

  // const empdata = [
  //   {
  //     id: 1,
  //     name: "Manoj",
  //     age: 29,
  //     isActive: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "Rohit",
  //     age: 21,
  //     isActive: 1,
  //   },
  //   {
  //     id: 3,
  //     name: "vishal",
  //     age: 24,
  //     isActive: 0,
  //   },
  //   {
  //     id: 4,
  //     name: "Pankaj",
  //     age: 25,
  //     isActive: 1,
  //   },
  // ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7047/api/Employee")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7047/api/Employee/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAge(result.data.age);
        setIsActive(result.data.isActive);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are You sure to delete ") === true) {
      axios
        .delete(`https://localhost:7047/api/Employee/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Employee Has Been deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error("Employee Has not Added");
        });
    }
  };

  const handleUpdate = (id) => {
    const Url = `https://localhost:7047/api/Employee/${editId}`;
    const data = {
      id : editId,
      name: editName,
      age: editAge,
      isActive: isEditActive,
    };

    axios
      .put(Url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Employee Has Been Updateded");
      })
      .catch((error) => {
        toast.error("Employee Has not Updated");
      });
  };

  const handleSave = () => {
    const Url = "https://localhost:7047/api/Employee";
    const data = {
      name: name,
      age: age,
      isActive: isActive,
    };

    axios
      .post(Url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Employee Has Been Added");
      })
      .catch((error) => {
        toast.error("Employee Has not Added");
      });
  };
  const clear = () => {
    setName("");
    setAge("");
    setIsActive(0);
    setEditName("");
    setEditAge("");
    setIsEditActive(0);
    setEditId("");
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setIsActive(1);
    } else {
      setIsActive(0);
    }
  };

  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setIsEditActive(1);
    } else {
      setIsEditActive(0);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <div style={{ margin: "4 rem" }}>
        <Container
          className="m-6"
          style={{ border: "1px solid black ", margin: "7" }}
        >
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              {" "}
              <input
                type="text"
                className="form-control"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="checkBox"
                checked={isActive === 1 ? true : false}
                onChange={(e) => handleActiveChange(e)}
                value={isActive}
              />
              <label>isActive</label>
            </Col>
            <Col>
              <button className="btn btn-primary" onClick={() => handleSave()}>
                Submit
              </button>
            </Col>
          </Row>
        </Container>
        <div className="container mt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>

                <th>Name</th>
                <th>Age</th>
                <th>isActive</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      &nbsp; &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr aria-colspan="5">Loading ...</tr>
              )}
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modify Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container className="m-6" style={{ margin: "7" }}>
                <Row>
                  <Col>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Age"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <input
                      type="checkBox"
                      checked={isEditActive === 1 ? true : false}
                      onChange={(e) => handleEditActiveChange(e)}
                      value={isEditActive}
                    />
                    <label>isActive</label>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
};

export default Crud;
