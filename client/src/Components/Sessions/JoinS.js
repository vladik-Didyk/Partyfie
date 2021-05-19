import React from 'react'
import joinS from './JoinS.jpg'
import Button from 'react-bootstrap/Button'
import { Container, Col, Row, Form } from 'react-bootstrap';

export default function JoinS() {

    return (
        <div>
            <div>
                <Container className='mt-5 pt-5 content'>
                    <Row>
                        <Col lg={8} md={6} sm={12}  className='content'>
                            <img className="w-100" src={joinS} alt='img_create_session' />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label style={{"textTransform": "uppercase"}}>Join a Session</Form.Label>
                                    <Form.Control type="text" placeholder="" autoComplete="off" />
                                </Form.Group>

                                <Form.Group className='mt-2' controlId="formBasicPassword">
                                    <Form.Label style={{"textTransform": "uppercase"}}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="" autoComplete="off" />
                                </Form.Group>
                                <Button className='create-session style={{"textTransform": "uppercase"}} m-4' type="submit">
                                    Enter Session
                            </Button>
                            </Form>

                        </Col>
                    </Row>

                </Container>
            </div>


        </div>
    )
}
