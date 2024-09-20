import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

export default function Particular() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [particularList, setParticularList] = useState([]);

  useEffect(() => {
    const fetchParticulars = async () => {
      try {
        const response = await fetch('http://localhost:5000/particular');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setParticularList(data);
      } catch (error) {
        console.error('Error fetching particulars:', error);
      }
    };

    fetchParticulars();
  }, []);

  const onSubmit = async (data) => {
    console.log('Form data submitted:', data); 

    try {
      const response = await fetch('http://localhost:5000/particular', {
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

      // Adding the new particular to the list
      setParticularList(prevList => [...prevList, data]);
      reset({ type: '' }); 
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <div>
      <h3>Particular Components</h3>
      <div className="row part_row">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="particular_comp">
              <div className="heading">
                <h5>Particular Form</h5>
              </div>
              <div className="content">
                <Form.Group controlId="particular">
                  <Form.Label>Particular</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    placeholder="Enter particular type"
                    {...register('type', { required: true })}
                    isInvalid={errors.type}
                  />
                  {errors.type && (
                    <Form.Control.Feedback type="invalid">
                      Particular is required.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
              <button type="submit" className="ml-2 mb-3 mt-2">Add</button>
            </div>
          </form>
        </div>
        <div className="col-lg-6">
          <div className="particular_comp">
            <div className="heading">
              <h5>List of Particulars</h5>
            </div>
            <div className="table-responsive">
              <Table>
                <thead>
                  <tr>
                    <th>Sr no.</th>
                    <th>Particular Type</th>
                  </tr>
                </thead>
                <tbody>
                  {particularList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.type}</td>
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
