import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Blackjack from './components/Blackjack';


const App = () => {
    return (
    <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/Blackjack' component={Blackjack}></Route>
        </Switch>
      </Router>
    );
}

export default App;