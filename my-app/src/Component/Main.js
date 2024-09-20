import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Main() {
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [creditTotal, setCreditTotal] = useState(0);
  const [debitTotal, setDebitTotal] = useState(0);
  const [creditDates, setCreditDates] = useState([]);

  const pieData = {
    labels: ['Debit Amount', 'Credit Amount'],
    datasets: [
      {
        data: [debitTotal, creditTotal],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const creditTransactions = entries
      .filter(entry => entry.expenseType === 'Credit')
      .map(entry => new Date(entry.date)); // Convert dates to JavaScript Date objects

    setCreditDates(creditTransactions);  // Save credit transaction dates to state
  }, [entries]);

  const highlightCreditDays = ({ date, view }) => {
    if (view === 'month') {
      // Check if the current date is in the creditDates array
      return creditDates.find(creditDate => 
        creditDate.getFullYear() === date.getFullYear() &&
        creditDate.getMonth() === date.getMonth() &&
        creditDate.getDate() === date.getDate()
      ) ? 'highlight-credit-day' : null;  // Return a custom class if it's a credit day
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/entries')
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error('Error fetching entries:', error));
  }, []);

  useEffect(() => {
    const filtered = entries.filter(entry =>
      entry.username && entry.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEntries(filtered);

    // Calculate total credit and debit
    const credit = filtered
      .filter(entry => entry.expenseType === 'Credit')
      .reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

    const debit = filtered
      .filter(entry => entry.expenseType === 'Debit')
      .reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

    setCreditTotal(credit);
    setDebitTotal(debit);
  }, [searchQuery, entries]);

  return (
    <Container fluid>
      <Row className="my-3">
        <Col md={12}>
          <Card>
            
            <Card.Body>
              <Form>
                <Row className="align-items-center">
                  <Col>
                    <Form.Control type="text" placeholder="Search User Name"  value={searchQuery}
                      onChange={handleSearchChange}/>
                  </Col>
                  <Col xs="auto">
                    <Button variant="primary" type="submit">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <Card>
            <Card.Body>
              
              <Row className="mt-4">
                <Col md={6}>
                  <Card>
                    <Card.Body>
                     
                      <Calendar   tileClassName={highlightCreditDays}  />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className='pie-section'>
                  <Row>
                <Col>
                  <Card>
                    <Card.Body className='p1'>
                      <Card.Title >Total Expense</Card.Title>
                      <Card.Text>{creditTotal + debitTotal}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Body className='p2'>
                      <Card.Title>Credit Amount</Card.Title>
                      <Card.Text>{creditTotal}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Body className='p3'>
                      <Card.Title>Debit Amount</Card.Title>
                      <Card.Text>{debitTotal}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
                    <Card.Body>
                      <Card.Title className='pie-title'>Expense Status</Card.Title>
                      <div className="d-flex justify-content-center chart">
                        <Pie data={pieData} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Users List</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>User Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Particular Type</th>
                    <th>Expense Type</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                {filteredEntries.map((entry, index) => (
                    <tr key={entry.id}>
                      <td>{index + 1}</td>
                      <td>{entry.username}</td>
                      <td>{entry.amount}</td>
                      <td>{entry.date}</td>
                      <td>{entry.particularType}</td>
                      <td>{entry.expenseType}</td>
                      <td>{entry.message}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
