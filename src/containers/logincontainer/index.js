import './logincontainer.css';
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import Login from '../../components/login';
import Register from '../../components/register';

const LoginContainer = () => {

    const [tabSelected, setTabSelected] = useState(new URLSearchParams(useLocation().search));

    return (
        <Row className="login-container flex-wrap row justify-content-center">
            <Col xs={12} className="text-center">
                <Row>
                    <img src='/assets/img/logo.png' className='logo' alt="Life Informática"/>
                </Row>
                <Row>
                    <Col xs={12} md={6} className="mt-5 tabs-actions">
                        <Tabs defaultActiveKey={tabSelected.get("tab")? 'register': 'login'} id="action-tab">
                            <Tab eventKey="login" title="Login">
                                <Login/>
                            </Tab>
                            <Tab eventKey="register" title="Registro">
                                <Register/>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default LoginContainer;