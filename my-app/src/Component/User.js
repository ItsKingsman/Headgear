import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

export default function User() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/Users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    console.log('Form data submitted:', data); 

    try {
      const response = await fetch('http://localhost:5000/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Record added successfully');

      
      setUserList(prevList => [...prevList, data]);
      reset(); 
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <div>
      <h3>User</h3>
      <div className="row part_row">
        <div className="col-lg-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="particular_comp">
              <div className="heading">
                <h5>User Form</h5>
              </div>
              <div className="content">
                <Form.Group controlId="username">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter username"
                    {...register('name', { required: true })}
                    isInvalid={errors.name}
                  />
                  {errors.name && (
                    <Form.Control.Feedback type="invalid">
                      Username is required.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email-Id:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    {...register('email', { required: true })}
                    isInvalid={errors.email}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      Email is required.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group controlId="mobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile number"
                    {...register('mobile', {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Mobile number must be exactly 10 digits"
                      }
                    })}
                    isInvalid={errors.mobile}
                  />
                  {errors.mobile && (
                    <Form.Control.Feedback type="invalid">
                      {errors.mobile.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <button type="submit" className="ml-2 mb-3 mt-2">Add</button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-lg-8">
          <div className="particular_comp">
            <div className="heading">
              <h5>List of Users</h5>
            </div>
            <div className="table-responsive">
              <Table>
                <thead>
                  <tr>
                    <th>Sr no.</th>
                    <th>Username</th>
                    <th>Mobile No</th>
                    <th>Email Id</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.mobile}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
