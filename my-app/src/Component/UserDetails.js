import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useForm } from 'react-hook-form';

export default function UserDetails() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [usernames, setUsernames] = useState([]);
  const [particulars, setParticulars] = useState([]);
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    amount: "",
    date: "",
    particularType: "",
    expenseType: "",
    message: ""
  });

  useEffect(() => {
    // Fetch usernames from the JSON server
    fetch("http://localhost:5000/Users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched usernames:", data); // Log fetched usernames
        setUsernames(data.filter(user => user.name)); // Ensure only valid usernames are included
      })
      .catch((error) => console.error("Error fetching usernames:", error));

    // Fetch particulars from the JSON server
    fetch("http://localhost:5000/particular")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched particulars:", data); // Log fetched particulars
        setParticulars(data.filter(particular => particular.type)); // Ensure only valid particulars are included
      })
      .catch((error) => console.error("Error fetching particulars:", error));

    // Fetch user list from the JSON server
    fetch("http://localhost:5000/entries")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched user list:", data); // Log fetched user list
        setUserList(data);
      })
      .catch((error) => console.error("Error fetching user list:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = (e) => {
    // e.preventDefault();

    // Send the form data to the JSON server
    fetch("http://localhost:5000/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Update the user list to include the new entry
        setUserList([...userList, data]);
        // Optionally, reset the form
        setFormData({
          username: "",
          amount: "",
          date: "",
          particularType: "",
          expenseType: "",
          message: ""
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h3>UserDetails</h3>
      <div className="row part_row">
        <div className="col-lg-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="particular_comp">
              <div className="heading">
                <h5>User Form</h5>
              </div>
              <div className="content">
                <label>Username:</label>
                <Form.Select
                  aria-label="Select Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  
                >
                  <option value="">--Select Username--</option>
                  {usernames.map((user, index) => (
                    <option key={index} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>

                <label>Amount:</label>
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter Amount"
                  value={formData.amount}
                  onChange={handleChange}
                />

                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

                <label>Particular Type:</label>
                <Form.Select
                  aria-label="Select Particular Type"
                  name="particularType"
                  value={formData.particularType}
                  onChange={handleChange}
                >
                  <option value="">--Select Particular Type--</option>
                  {particulars.map((particular, index) => (
                    <option key={index} value={particular.type}>
                      {particular.type}
                    </option>
                  ))}
                </Form.Select>

                <label>Expense Type:</label>
                <Form.Select
                  aria-label="Select Expense Type"
                  name="expenseType"
                  value={formData.expenseType}
                  onChange={handleChange}
                >
                  <option value="">-- Select Expense Type --</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </Form.Select>

                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Enter Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="ml-2 mb-3 mt-2">
                Add
              </button>
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
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Particular Type</th>
                    <th>Expense Type</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.amount}</td>
                      <td>{user.date}</td>
                      <td>{user.particularType}</td>
                      <td>{user.expenseType}</td>
                      <td>{user.message}</td>
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
