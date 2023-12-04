# Ethereum lottery

## Smart contract written in Solidty

Currently in Goerli Network.

Using Alchemy and Hardhat to deploy the contract. Using ChainLink random number generator to get the lottery numbers in true verifiable randomness.

## Mobile app built with React Native, no Expo

Integrates with the MetaMask app. All transactions are made with the MetaMask account.

Ethers.js and MetaMask SDK.

It is currently not possible to use the ethers package with Expo, so the project must be native from the start (can't use expo managed). As the crypto package is now native to the browsers, the npm crypto package has been deprecated, so the metamask SDK must be updated inside node_modules. Follow the path node_modules/@metamask/sdk/dist/react-native/metamask-sdk.js. In the first line of the file change the import from "crypto" to "react-native-crypto". After doing this Ethers should work just fine, both in development and production.

## Website in alpha, will be included in the repo

React website with Material UI. Integrates autommatically with MetaMask.