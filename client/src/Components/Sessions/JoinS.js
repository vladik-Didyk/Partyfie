import React, { useState, useEffect} from 'react'
import joinS from './JoinS.jpg'
import Button from 'react-bootstrap/Button'
import { Container, Col, Row, Form } from 'react-bootstrap';
import axios from 'axios'

export default function JoinS() {
    const [sessionName, setSessionName] = useState('');
    const [sessionPass, setSessionPass] = useState('');

    const [sessionList, setSessionList] = useState([])

    useEffect(() => {
        axios.post('http://localhost:3000/session/create').then((response) => {
            setSessionList(response.data);
        })

    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        const sessionList = {sessionName, sessionPass};
    }
    
    function handleChange(event) {
        setSessionName({ ...sessionList, [sessionList]: event.target.value });
    }
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
                                <Form.Group onSubmit={handleSubmit} controlId="formBasicEmail">
                                    <Form.Label style={{"textTransform": "uppercase"}}>Join a Session</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="" 
                                    autoComplete="off"
                                    value={sessionName}
                                    onChange={(event) => { setSessionName(event.target.value) }} />
                                </Form.Group>

                                <Form.Group className='mt-2' controlId="formBasicPassword">
                                    <Form.Label style={{"textTransform": "uppercase"}}>Password</Form.Label>
                                    <Form.Control 
                                    type="password"
                                     placeholder="" 
                                     autoComplete="off"
                                     value={sessionPass}
                                     onChange={(event) => { setSessionPass(event.target.value) }} />
                                </Form.Group>
                                <Button 
                                className='create-session m-4' style={{"textTransform": "uppercase"}}  type="submit">
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
