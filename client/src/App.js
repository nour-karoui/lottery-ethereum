import "./App.css";
import React from "react";
import {lottery} from "./lottery";
import web3 from "./web3";

class App extends React.Component {

    state = {
        manager: '',
        players: [],
        balance: '',
        value: '',
        message: ''
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        this.setState({manager, players, balance});
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'waiting on transaction success...' })
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, "ether")
        });
        this.setState({ message: 'you are now part of the game, there is no going back now' });
    }

    pickWinner = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'waiting on transaction success...' })
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })
        this.setState({ message: 'There is a winner, it\'s you, wouhouuuuu ! check you metamask wallet' });
    }

    render() {
        return (
            <div>
                <h2>Lottery Contract</h2>
                <p>This contract is managed by {this.state.manager}</p>
                <div>
                    <p>the number of players already registered is {this.state.players.length}</p>
                    <p>They are competing to win {web3.utils.fromWei(this.state.balance, "ether")} ETHER !</p>
                </div>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <h4>Want to try your luck ?</h4>
                    <div>
                        <label>Amount</label>
                        <input
                            onChange={event => this.setState({ value: event.target.value })}
                            value={this.state.value}
                        />
                    </div>
                    <button type="submit">Enter</button>
                </form>
                <hr/>
                <h4>Ready to pick a winner?</h4>
                <button onClick={this.pickWinner}>Pick a winner</button>
                <hr/>
                <h1>{this.state.message}</h1>
            </div>
        );
    }
}

export default App;
