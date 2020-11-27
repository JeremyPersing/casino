import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <li><NavLink to='/' exact>Home</NavLink></li>
            <li><NavLink to='/Blackjack' exact>Blackjack</NavLink></li>
            <li><NavLink to='/Coinflip' exact>Coin Flip</NavLink></li>
            <li><NavLink to='/Dice' exact>Dice Roll</NavLink></li>
        </div>
    )
}

export default Nav;