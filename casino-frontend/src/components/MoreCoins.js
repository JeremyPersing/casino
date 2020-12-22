import Nav from './Nav';
import Axios from 'axios';

const MoreCoins = (props) => {
    const addCoins = () => {
        let amount = Math.floor(Math.random() * 100);
        console.log(amount);

        let endCoins = props.coins + amount;
        props.setUserCoins(endCoins)

        Axios.put('http://localhost:5000/user', {
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
            <Nav coins={props.coins} userName={props.usersName}/>
            <h1>More coins Page</h1>
            <button onClick={addCoins}>Get Some Coins</button>
        </div>
    )
}

export default MoreCoins;