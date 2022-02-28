import React, { useState, useEffect} from 'react';
import CommandForm from './CommandForm';
import ResetButton from './ResetButton';
import Board from './ShipAndGrid';
import '../styles/home.css';
import '../styles/start.css'


const Start = () => {

  const createRobot = async () => {
      const robot = await fetch('http://localhost:3333/robot', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: '',
      })
      const content = await robot.json()
      window.location.reload();
  }
  
  return (
    <div className='startContainer'>
      <button type="text"
      onClick={createRobot}
      className="button"
      >Launch Robot
      </button>

    </div>
  )
}
const Home = () => {
  const [haveRobotCreated, setHaveRobotCreated] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  
    const loadRobot = async () => {
      setIsLoading(true)
      const getRobotURL = 'http://localhost:3333/robot'
      const response = await fetch(getRobotURL);
      const data = await response.json()
      setHaveRobotCreated(data.length)
      setIsLoading(false)
  }
  useEffect(() => {
      loadRobot();
  }, [])


  if (isLoading) return <div>loading</div>
  if (haveRobotCreated <= 0) return <Start />
  return (
    <div  className='home'>
      <div className='left'>
        <header className="header">
        <h1 className="explore">Explore</h1>
        <h1 className="mars">Mars</h1>
        </header>
        <CommandForm />
   
      </div>
      <div className="right">
        
      <Board className='board' />
      <ResetButton />
      </div>
    </div>
  );
};

export default Home;