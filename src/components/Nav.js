import { Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div class='d-flex justify-content-center mb-4'> 
            <ul class='nav nav-tabs'>
                <li class='nav-item'>
                    <Link class='nav-link' to='/' exact>Home</Link>
                </li>
                <li class='nav-item'>
                    <Link class='nav-link' to='/blackjack' exact>Blackjack</Link>
                </li>
                <li class='nav-item'>
                    <Link class='nav-link' to='/coinflip' exact>Coin Flip</Link>
                </li>
                <li class='nav-item'>
                    <Link class='nav-link' to='/dice' exact>Dice Roll</Link>
                </li>
                <li class='nav-item'>
                    <Link class='nav-link' to='/crash' exact>Crash</Link>
                </li>
                <li class='nav-item'>
                    <Link class='nav-link' to='/roulette' exact>Roulette</Link>
                </li>
                <li class='mr-auto mt-2'>
                <img src={process.env.PUBLIC_URL + '/images/bitcoinlogo.png'} alt='Coins Logo' style={{height: '25px'}}></img>
                {parseFloat(props.coins).toFixed(2)}
                </li>
            </ul>
        </div>
    )
}

export default Nav;