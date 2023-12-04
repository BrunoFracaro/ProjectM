# Ethereum lottery

## Smart contract written in Solidty

Currently in Goerli Network. Address: 0x9b0164272ca6744eb66d8508191Ff6fAA8475b1a

Using Alchemy and Hardhat to deploy the contract. Using ChainLink random number generator to get the lottery numbers in true verifiable randomness.

## Mobile app built with React Native, no Expo

Integrates with the MetaMask app. All transactions are made with the MetaMask account.

Ethers.js and MetaMask SDK.

It is currently not possible to use the ethers package with Expo, so the project must be native from the start (can't use expo managed). As the crypto package is now native to the browsers, the npm crypto package has been deprecated, so the metamask SDK must be updated inside node_modules. Follow the path node_modules/@metamask/sdk/dist/react-native/metamask-sdk.js. In the first line of the file change the import from "crypto" to "react-native-crypto". After doing this Ethers should work just fine, both in development and production.

<img src="https://i.imgur.com/9TeMGLg.jpg" width="300"/>

Connect to MetaMask
<img src="https://i.imgur.com/yizU9yC.gifv" width="300"/>

And sign a transaction
<img src="https://i.imgur.com/TXGqRmu.gifv" width="300"/>

## Website in alpha, will be included in the repo

React website with Material UI. Integrates with MetaMask.

<img src="https://i.imgur.com/opBpPVD.png" width="300"/>
<img src="https://i.imgur.com/OR0aEky.png" width="300"/>