<h1 align="center">Welcome to lottery-ethereum 👋</h1>
<p>
  <a href="https://github.com/nour-karoui/lottery-ethereum#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/nour-karoui/lottery-ethereum/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/nour-karoui/lottery-ethereum/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/bishkou/password-pwnd" />
  </a>
</p>

#### A lottery application built on the ethereum network powered by smart contract, the client communicates with lottery system thanks to a react app.


### 🏠 [Homepage](https://github.com/nour-karoui/lottery-ethereum)


## Install

```sh
> git clone https://github.com/nour-karoui/lottery-ethereum.git
> cd lottery
> npm install
> npm run test

> cd lottery/client
> npm install
> npm start
```

## How It Works

A user simply chooses an amount of ether to send in order to enter the lottery, this amount should be bigger than 0.1 ether.
<hr />

<img src="https://user-images.githubusercontent.com/47257753/127235467-05818ad8-eda9-4312-8cc8-b740926d372c.png" width="200px" /> 
<p></p>
<img src="https://user-images.githubusercontent.com/47257753/127235533-e245f73d-423b-4c35-8cd4-0de49d6816f7.png" width="200px" />
<p></p>
<img src="https://user-images.githubusercontent.com/47257753/127235558-7be6658f-2e96-4d93-b2c1-ba970a2b01ad.png" width="200px" />

<hr />

A manager selects randomly a winner
The winner gets all the ether collected in the lottery, and the game resets.

<img src="https://user-images.githubusercontent.com/47257753/127236365-0fb0e1de-ecfd-4624-ab04-54e5d408f9ca.png" width="300px" /> 

<hr />

***PS***: In order to test this app, you need to have metamask extension installed, and have ether in your rinkeby network account.
You can fund your account through [faucet.rinkeby.io](https://faucet.rinkeby.io/).

## Under The Hood
* The contract is deployed in infura *(check **deploy.js**)*
* the client side communicates with the smart contract thanks to web3 *(check **client/src/web3.js** && **client/src/lottery.js**)*
* the smart contract is tested with mocha and ganache cli *(check **test/Lottery.test.js**)*


## Author

👤 **Nour**

* Github: [@nour-karoui](https://github.com/nour-karoui)
* LinkedIn: [@nourkaroui](https://www.linkedin.com/in/nourkaroui/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/nour-karoui/Inbox-Ethereum/issues). You can also take a look at the [contributing guide](https://github.com/nour-karoui/Inbox-Ethereum/blob/master/CONTRIBUTING.md).

## Show your support

Give a [STAR](https://github.com/nour-karoui/lottery-ethereum) if this project helped you!

## 📝 License

* Copyright © 2021 [Nour](https://github.com/nour-karoui).
* This project is [MIT](https://github.com/nour-karoui/lottery-ethereum/blob/master/LICENSE) licensed.

***
_This README was generated with by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
