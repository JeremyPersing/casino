import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import '../CSS/styles.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav as FormerNav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';



const Nav = (props) => {
    const history = useHistory();
    // Used for the hamburger menu icon
    const [isOpen, setIsOpen] = useState(false);
    // Used for when the navbar is open
    const [playerInfoLocation, setPlayerInfoLocation] = useState('')
    // Used for when the navbar is closing
    const [playerInfoVisibility, setPlayerInfoVisibility] = useState('visible');

    const toggle = () => {
        // When the hamburger icon is open then is open turns true && vice versa
        setIsOpen(!isOpen)
        // Set the player info to the middle when open
        if (!isOpen) {
            setPlayerInfoLocation('mx-auto');
        }
        // otherwise put it back on the right
        else {
            setPlayerInfoVisibility('hidden')
            setTimeout(() => {
                setPlayerInfoLocation('');
                setPlayerInfoVisibility('visible');
        }, 370);
        }
    };

    const logOutUser = () => {
        props.setUsersName('');
        localStorage.clear();
        history.push('/');
    }

    return (
        <div>
            <Navbar light expand='md' style={{fontSize: '110%'}}>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <FormerNav className='former-nav mr-auto' navbar>
                        <NavItem style={{listStyleType: 'none'}}>
                            <Link className='nav-link' to='/home'>Home</Link>
                        </NavItem>
                        <UncontrolledDropdown style={{listStyleType: 'none'}} nav inNavbar>
                            <DropdownToggle className='nav-link' nav caret>
                                Play
                            </DropdownToggle>
                            <DropdownMenu className='text-center' right>
                                <DropdownItem>
                                    <Link className='nav-link' to='/blackjack'>Blackjack</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link className='nav-link' to='/coinflip'>Coin Flip</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link className='nav-link' to='/crash'>Crash</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link className='nav-link' to='/dice'>Dice Roll</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link className='nav-link' to='/roulette'>Roulette</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem style={{listStyleType: 'none'}}>
                        <Link className='nav-link' to='/morecoins'>More Coins</Link>
                        </NavItem>
                        <NavItem style={{'listStyleType': 'none'}}>
                            <p 
                            className='nav-link' 
                            style={{cursor: 'pointer'}}
                            onClick={logOutUser}
                            >Log Out
                            </p>
                        </NavItem>
                    </FormerNav>
                </Collapse>
                <div style={{visibility: `${playerInfoVisibility}`}} className={playerInfoLocation} >
                    <NavbarText style={{color: '#333'}}>
                        <p>{props.usersName}</p>
                    </NavbarText>
                    <NavbarText style={{color: '#333', marginBottom: '13px'}}>
                        <img src={process.env.PUBLIC_URL 
                        + '/images/bitcoinlogo.png'} 
                        alt='Coins Logo' 
                        style={{height: '25px', color: '#333'}}>
                        </img>
                        {parseFloat(props.coins).toFixed(2)}
                    </NavbarText>
                </div>
            </Navbar>
        </div>
    )
}

export default Nav;