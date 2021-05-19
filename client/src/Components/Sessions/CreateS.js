import React, { useState, useEffect } from "react";
import createS from "./CreateS.jpg";
import Button from "react-bootstrap/Button";
import { Container, Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../Auth";

export default function CreateS() {
  const { token } = useAuth() 
  const [nameSession, setNameSession] = useState("");
  const [sessionPass, setSessionPass] = useState("");
  const [sessionUsers, setSessionUsers] = useState("");

  const [sessionList, setSessionList] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post("http://localhost:8080/session/create", {
      token: token,
      sessionName: nameSession,
      password: sessionPass,
      maxNumListeners: sessionUsers,
    });
  }

  function handleChange(event) {
    setNameSession({ ...sessionList, [sessionList]: event.target.value });
  }

  return (
    <div>
      <Container className="mt-5 pt-5 content">
        <Row>
          <Col lg={4} md={6} sm={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ textTransform: "uppercase" }}>
                  Create Session Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoComplete="off"
                  value={nameSession}
                  onChange={(event) => {
                    setNameSession(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicPassword">
                <Form.Label style={{ textTransform: "uppercase" }}>
                  Password
                </Form.Label>

                <Form.Control
                  type="password"
                  placeholder=""
                  autoComplete="off"
                  value={sessionPass}
                  onChange={(event) => setSessionPass(event.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mt-2"
                controlId="exampleForm.ControlSelect1"
              >
                <Form.Label style={{ textTransform: "uppercase" }}>
                  Number Of Participants
                </Form.Label>
                <Form.Control
                  as="select"
                  value={sessionUsers}
                  onChange={(event) => setSessionUsers(event.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
              </Form.Group>

              <Button className="create-session m-4" type="submit">
                Create Session
              </Button>
            </Form>
          </Col>

          <Col lg={8} md={6} sm={12}>
            <img className="w-100" src={createS} alt="img_create_session" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
