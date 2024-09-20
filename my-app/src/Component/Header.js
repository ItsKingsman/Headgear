import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Rightnav from './Rightnav';


export default function () {
  return (
    <Container className='contain'>
        <Row >
        <Col lg="2" className='sidebar'>
          <Sidebar/>
        </Col>       
        <Col xs lg="10" className='rightnav'>
          <Rightnav/>        
          <Outlet/>
        </Col>
        </Row>
    </Container>
  )
}
