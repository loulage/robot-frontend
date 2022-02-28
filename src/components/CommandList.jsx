import React from 'react';
import '../styles/commandList.css'

const CommandList = () => {

  return (
    <div className="commandListContainer">
      <h3 className="title">
        Command List
      </h3>
      <p>
        M - move <br/>
        R - rotate 90º right <br/>
        L - rotate 90º left <br/> <br/>
        Example - MMMRML
      </p>
    </div>
  );
};

export default CommandList;