import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div>
            <li><NavLink to='/' exact>Home</NavLink></li>
            <li><NavLink to='/blackjack' exact>Blackjack</NavLink></li>
            <li><NavLink to='/coinflip' exact>Coin Flip</NavLink></li>
            <li><NavLink to='/dice' exact>Dice Roll</NavLink></li>
            <li><NavLink to='/crash' exact>Crash</NavLink></li>
            <li><NavLink to='/roulette' exact>Roulette</NavLink></li>
            <p><img src={process.env.PUBLIC_URL + '/images/bitcoinlogo.png'} alt='Coins Logo' style={{height: '25px'}}></img>{parseFloat(props.coins).toFixed(2)}</p>
        </div>
    )
}

export default Nav;