import Nav from './Nav';
import Axios from 'axios';

const MoreCoins = (props) => {
    const addCoins = () => {
        let amount = Math.floor(Math.random() * 100);
        console.log(amount);

        let endCoins = props.coins + amount;
        props.setUserCoins(endCoins)

        Axios.put('/user', {
            userName: props.usersName,
            coins: endCoins
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <div>
            <Nav coins={props.coins} userName={props.usersName} usersName={props.usersName} setUsersName={props.setUsersName}/>
            <h1>Your Friendly Coin Bar</h1>
            <button className='mt-3 btn btn-primary' onClick={addCoins}>Free Coins</button>
        </div>
    )
}

export default MoreCoins;