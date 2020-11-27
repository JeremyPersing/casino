import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <li><NavLink to='/' exact>Home</NavLink></li>
            <li><NavLink to='/blackjack' exact>Blackjack</NavLink></li>
            <li><NavLink to='/coinflip' exact>Coin Flip</NavLink></li>
            <li><NavLink to='/dice' exact>Dice Roll</NavLink></li>
            <li><NavLink to='crash' exact>Crash</NavLink></li>
        </div>
    )
}

export default Nav;