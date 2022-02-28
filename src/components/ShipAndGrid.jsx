import React, { useState, useEffect } from 'react';
import spaceship from '../images/spaceship.png';
import '../styles/shipAndGrid.css';

const Tile = () => {
  return <div className="tile"></div>;
};

const Robot = ({spaceshipLogo, robotDirection}) => {
  return (
    <div className="tile">
      <img className="robotImg"  src={spaceshipLogo} style={robotDirection} />
    </div>
    ) 
  }

const transformDirectionToDegree = (direction) => {
  let rotationDegree
  switch (direction) {
    case 'N':
      return rotationDegree = '0deg'
    case 'E':
      return rotationDegree = '90deg'

    case 'S':
      return rotationDegree = '180deg'
    case 'W':
      return rotationDegree =  '-90deg'

  }
}

const parseCurrentPosition = (array) => {
  const [x, y, z] = array;
  const parsedCP = [+x, +y, z]
  return parsedCP
}


const Board = () => {
  const [robotPosition, setRobotPosition] = useState([])
  const [haveRobot, setHaveRobot] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
  await setIsLoading(true)
  const URL = 'http://localhost:3333/robot'
  const response = await fetch(URL);
  const data = await response.json()
  setRobotPosition(data[0].current_position)
  await setIsLoading(false)
}

  const boardSize = [0, 1, 2, 3, 4];
  const reverseBoardSize = [4, 3, 2, 1, 0];
  const parsedRobotCurrentLocation = parseCurrentPosition(robotPosition)
  const transform = transformDirectionToDegree(parsedRobotCurrentLocation[2])
  const robotDir = {transform: `rotate(${transform})`}

  if (isLoading) return <div>loading</div>
  return (
    <div className="board">
      {reverseBoardSize.map((row) => {
        return boardSize.map((column) =>
          parsedRobotCurrentLocation[0] === column && parsedRobotCurrentLocation[1] === row ? (
            <Robot spaceshipLogo={spaceship} robotDirection={robotDir} />
          ) : (
            <Tile />
          ),
        );
      })}
    </div>
  );
};

export default Board;
