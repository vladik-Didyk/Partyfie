import React, { useState } from "react";
import joinS from "./JoinS.jpg";
import Button from "react-bootstrap/Button";
import { Container, Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../Auth";
import { useHistory, withRouter } from "react-router";

function JoinS() {
  const { token } = useAuth();
  const [sessionName, setSessionName] = useState("");
  const [sessionPass, setSessionPass] = useState("");
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post("http://localhost:8080/session/join", {
      token: token,
      sessionName: sessionName,
      password: sessionPass,
    });
    const { sessionId } = response.data;
    if (sessionId) history.push(`/session/${sessionId}`);
  }

  return (
    <div>
      <div>
        <Container className="mt-5 pt-5 content">
          <Row>
            <Col lg={8} md={6} sm={12} className="content">
              <img className="w-100" src={joinS} alt="img_create_session" />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label style={{ textTransform: "uppercase" }}>
                    Join a Session
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    autoComplete="off"
                    value={sessionName}
                    onChange={(event) => {
                      setSessionName(event.target.value);
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
                    onChange={(event) => {
                      setSessionPass(event.target.value);
                    }}
                  />
                </Form.Group>
                <Button
                  className="create-session m-4"
                  style={{ textTransform: "uppercase" }}
                  type="submit"
                >
                  Enter Session
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default withRouter(JoinS);
