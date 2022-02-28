import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/resetButton.css'

const ResetButton = () => {
  const [robotId, setRobotId] = useState();

  useEffect(() => {
    getRobotId()
  }, [])

  const getRobotId = async () => {
    const URL = 'http://localhost:3333/robot'
    const response = await fetch(URL);
    const data = await response.json()
    await setRobotId(data[0].id)
  }


  const onSubmit = async () => {
    const rawResponse = await fetch('http://localhost:3333/robot/reset', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({robotId: robotId}),
    })
    const content = await rawResponse.json()
  };

return (
  <Form>
    <Button
    className="resetButton"
    type="submit"
    onClick={onSubmit}>Reset</Button>
  </Form>
)
}

export default ResetButton;