import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {useState} from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Blackjack from './components/Blackjack';
import CoinFlip from './components/Coinflip';
import Dice from './components/Dice';
import Crash from './components/Crash';
import Roulette from './components/Roulette';


const App = () => {
  const [money, setMoney] = useState(100);

  return (
  <Router>
      <Nav />
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/blackjack' component={Blackjack}></Route>
        <Route path='/coinflip' component={CoinFlip}></Route>
        <Route path='/dice' component={Dice}></Route>
        <Route path='/crash' component={Crash}></Route>
        <Route path='/roulette' component={Roulette}></Route>
      </Switch>
    </Router>
  );
}

export default App;