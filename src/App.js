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
  const [coins, setCoins] = useState(500);
  const [wager, setWager] = useState(0);

  return (
  <Router>
      <Nav coins={coins} setCoins={setCoins} wager={wager} setWager={setWager}/>
      <Switch>
        <Route exact path='/' render={props => (<Home {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager}/>)}></Route>

        <Route path='/blackjack' render={props => (<Blackjack {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager}/>)}></Route>

        <Route path='/coinflip' render={props => (<CoinFlip {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager}/>)}></Route>

        <Route path='/dice' render={props => (<Dice {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager}/>)}></Route>

        <Route path='/crash' render={props => (<Crash {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager}/>)}></Route>

        <Route path='/roulette' render={props => (<Roulette {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager}/>)}></Route>
      </Switch>
    </Router>
  );
}

export default App;