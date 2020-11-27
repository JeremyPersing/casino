import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {useState} from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Blackjack from './components/Blackjack';
import CoinFlip from './components/Coinflip';


const App = () => {
  const [money, setMoney] = useState(100);

  return (
  <Router>
      <Nav />
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/Blackjack' component={Blackjack}></Route>
        <Route path='/Coinflip' component={CoinFlip}></Route>
      </Switch>
    </Router>
  );
}

export default App;