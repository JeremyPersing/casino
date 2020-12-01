
const Wager = (props) => {
    

    const handleClick = (event) => {
        event.preventDefault();
        props.setCoins(props.coins - props.wager)
    }

    const handleChange = (event) => {
        props.setWager(event.target.value)
    }

    return (
        <div id='wager'>
            <form onSubmit={handleClick}>
                <h1>Place Your Bet</h1>
                <input type='number' min={1} required placeholder='1 Coin Min Bet' onChange={handleChange} id='wager'></input>
                <input type='submit' value='Bet'/>
            </form>
            
        </div>
    )
}

export default Wager;