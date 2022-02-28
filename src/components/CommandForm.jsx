import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/commandForm.css'

const CommandForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [robotId, setRobotId] = useState();

  useEffect(() => {
    getRobotId()
  }, [])

  const getRobotId = async () => {
    const URL = 'http://localhost:3333/robot'
    const response = await fetch(URL);
    const data = await response.json()
    setRobotId(data[0].id)
  }

  const onSubmit = async () => {
    const command = inputValue.toUpperCase()
    const id = robotId;
    const rawResponse = await fetch('http://localhost:3333/command', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({userInput: command, robotId: id}),
    })

    const content = await rawResponse.json()
  };

  return (
    <Form className="mb-3 container">
      <Form.Group className='group' controlId="command">
        <Form.Label
        className="label"
        >Write a Command!</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          style={ {textTransform: 'uppercase'}}
          placeholder="Only M R L allowed!"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Form.Group>
      <Button
      className="submitButton"
      type="submit"
      onClick={onSubmit}>Submit</Button>
    </Form>
  );
};

export default CommandForm;
