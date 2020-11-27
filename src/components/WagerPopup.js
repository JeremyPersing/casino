const WagerPopup = (props) => {
    const setWager = (amount) => {
        console.log(amount);
        
    }

    return (
        <div id='wagerPopup'>
            <form onSubmit={setWager}>
                <h1>Place Your Bet</h1>
                <input type='number' min={1} defaultValue={1} id='wager'></input>
                <input type='submit' value='Place'/>
            </form>
            
        </div>
    )
}

export default WagerPopup;