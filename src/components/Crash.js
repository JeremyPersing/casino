const Crash = () => {
    const play = () => {
        console.log('Playing crash')
    }

    return (
        <div>
            <h1>Crash</h1>
            <form onSubmit={play}>
                <input type='number' min='1' defaultValue='1'></input>
                <input type='submit' value='Place'></input>
            </form>
        </div>
    )
}

export default Crash