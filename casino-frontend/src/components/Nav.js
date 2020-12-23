import { Link, useHistory } from 'react-router-dom';


const Nav = (props) => {
    const history = useHistory();

    const logOutUser = () => {
        props.setUsersName('');
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className='d-flex justify-content-center mb-4'> 
            <ul className='nav nav-tabs'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/home'>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/blackjack'>Blackjack</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/coinflip'>Coin Flip</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/dice'>Dice Roll</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/crash'>Crash</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/roulette'>Roulette</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/morecoins'>More Coins</Link>
                </li>
                <li className='nav-item'>
                    <p 
                    className='nav-link' 
                    style={{cursor: 'pointer'}}
                    onClick={logOutUser}
                    >Log Out
                    </p>
                </li>
                <li className='nav-item'>
                    <p className='nav-link'>{props.usersName}</p>
                </li>
                <li className='mr-auto mt-2'>
                <img src={process.env.PUBLIC_URL 
                    + '/images/bitcoinlogo.png'} 
                    alt='Coins Logo' 
                    style={{height: '25px'}}>
                </img>
                {parseFloat(props.coins).toFixed(2)}
                </li>
            </ul>
        </div>
    )
}

export default Nav;