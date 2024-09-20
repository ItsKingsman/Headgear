import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import './style.css';
import { Link } from 'react-router-dom';


export default function Sidebar() {
  return (
    <div>
        <p className="text-center pt-3">Headgear Management</p>
        <hr/>
        <p  className="text-center ">Saurabh Chaurasia</p>
        <hr/>
        <div className='listname'>
        <ul>
        <li><i class="fa-regular fa-square-check"></i><Link to="/">Home</Link></li>
        <li><i class="fa-solid fa-user-gear"></i><Link to="/user">Users</Link></li>
        <li><i class="fa-solid fa-user-gear"></i><Link to="/particular">Particular</Link></li>
        <li><i class="fa-solid fa-user-gear"></i><Link to="/userdetails">User Details</Link></li>
         </ul>
         </div>
    </div>
  )
}
