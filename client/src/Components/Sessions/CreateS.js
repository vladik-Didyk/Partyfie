import React from 'react'
import createS from './CreateS.jpg'
import Button from 'react-bootstrap/Button'
import { Container, Col, Row, Form } from 'react-bootstrap';


export default function CreateS() {
    return (
        <div>
            <Container className='mt-5 pt-5 content'>
                <Row>
                    <Col lg={4} md={6} sm={12}>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={{ "textTransform": "uppercase" }}>Create Session Name</Form.Label>
                                <Form.Control type="text" placeholder="" autoComplete="off" />
                            </Form.Group>
                            <Form.Group className='mt-2' controlId="formBasicPassword">
                                <Form.Label style={{ "textTransform": "uppercase" }}>Password</Form.Label>
                                <Form.Control type="password" placeholder="" autoComplete="off" />
                            </Form.Group>
                            <Form.Group className='mt-2' controlId="exampleForm.ControlSelect1">
                                <Form.Label style={{ "textTransform": "uppercase" }}>Number Of Participants</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>

                            <Button className='create-session  m-4' type="submit">
                                Create Session
                            </Button>
                        </Form>

                    </Col>

                    <Col lg={8} md={6} sm={12}>
                        <img className="w-100" src={createS} alt='img_create_session' />
                    </Col>



                </Row>

            </Container>
        </div>
    )
}
