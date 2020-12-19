import React from 'react';
import Nav from './Nav';

const Home = (props) => {

  return (
    <div>
      <Nav coins={props.coins} userName={props.usersName}/>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
