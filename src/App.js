import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import Home from './components/Home';
import Blackjack from './components/Blackjack';


const App = () => {
    return (
    <Router>
        <li><NavLink to='/' exact>Home</NavLink></li>
        <li><NavLink to='/Blackjack' exact>Blackjack</NavLink></li>

        <Route exact path='/' component={Home}></Route>
        <Route exact path='/Blackjack' component={Blackjack}></Route>
      </Router>
    );
}

export default App;