import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Home from './components/Home';
import Blackjack from './components/Blackjack';
import CoinFlip from './components/Coinflip';
import Dice from './components/Dice';
import Crash from './components/Crash';
import Roulette from './components/Roulette';
import Login from './components/Login';
import Register from './components/Register';
import MoreCoins from './components/MoreCoins';
import Axios from 'axios';

const App = () => {
  const [coins, setCoins] = useState(0);
  const [wager, setWager] = useState(0);
  const [usersName, setUsersName] = useState();
  
  useEffect(() => {
    console.log('using useEffect now');
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log(loggedInUser)
      Axios.post('/username', {
        userName: loggedInUser
      }).then((res) => {
        setUsersName(res.data[0].userName); // Users name
        setCoins(res.data[0].coins); // Users coins
      })
    }
  }, []);

  return (
  <Router>
      <Switch>
        <Route exact path='/' render={props => (<Login {...props}
        usersName={usersName} setUsersName={setUsersName} coins={coins} setUserCoins={setCoins}></Login>)}></Route>

        <Route path='/register' render={props => (<Register {...props} 
        usersName={usersName} setUsersName={setUsersName} coins={coins} setUserCoins={setCoins}></Register>)}></Route>

        <Route path='/morecoins' render={props => (<MoreCoins {...props} 
        usersName={usersName} setUsersName={setUsersName} coins={coins} setUserCoins={setCoins}></MoreCoins>)}></Route>

        <Route path='/home' render={props => (<Home {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager} usersName={usersName} setUsersName={setUsersName}/>)}></Route>

        <Route path='/blackjack' render={props => (<Blackjack {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager} usersName={usersName} setUsersName={setUsersName}/>)}></Route>

        <Route path='/coinflip' render={props => (<CoinFlip {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager} usersName={usersName} setUsersName={setUsersName}/>)}></Route>

        <Route path='/dice' render={props => (<Dice {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager} usersName={usersName} setUsersName={setUsersName}/>)}></Route>

        <Route path='/crash' render={props => (<Crash {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager} usersName={usersName} setUsersName={setUsersName}/>)}></Route>

        <Route path='/roulette' render={props => (<Roulette {...props} 
        coins={coins} setCoins={setCoins} wager={wager} setWager={setWager} usersName={usersName} setUsersName={setUsersName}/>)}></Route>
      </Switch>
    </Router>
  );
}

export default App;