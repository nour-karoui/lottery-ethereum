const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require('../compile');

let lottery, accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: 1000000});
});

describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', "ether")
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(1, players.length);
    });

    it('allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[3],
            value: web3.utils.toWei('0.02', "ether")
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[4]
        });
        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(accounts[1], players[1]);
        assert.strictEqual(accounts[2], players[2]);
        assert.strictEqual(accounts[3], players[3]);
        assert.strictEqual(4, players.length);
    });

    it('doesn\'t allow a user to enter the lottery with less than 0.1 ether', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 10
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('only allows the manager to call pickWinner function', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        }catch (e) {
            assert(e);
        }
    });

    it('sends money to the winner and resets the table', async () => {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[1]);
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })

        const finalBalance = await web3.eth.getBalance(accounts[1]);
        assert.strictEqual((finalBalance - initialBalance).toString(), web3.utils.toWei('0.2', 'ether'));
        const lotteryBalance = await web3.eth.getBalance(lottery.options.address);
        assert.notStrictEqual(lotteryBalance, 0);

        const newPlayersTable = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.strictEqual(0, newPlayersTable.length);
    })
});

