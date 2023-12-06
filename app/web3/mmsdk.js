import { Linking } from 'react-native';

import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';

import '@ethersproject/shims';
import { ethers } from 'ethers';

const abi = require('../contract/Lottery.json')

class SingletonSDK {
  constructor() {
    if (!SingletonSDK.instance) {
      this.sdkInstance = null;

      this.initSdkInstance().then(() => {
        SingletonSDK.instance = this;
      });
    }

    return SingletonSDK.instance;
  }

  async initSdkInstance() {
    if (!this.sdkInstance) {
      this.sdkInstance = new MetaMaskSDK({
        openDeeplink: link => {
          Linking.openURL(link);
        },
        timer: BackgroundTimer,
        dappMetadata: {
          name: 'My dapp',
          url: 'https://mydapp.com',
        },
      });

      await MMSDK.init();
    }

    return this.sdkInstance;
  }

  async getEthereum() {
    if (this.sdkInstance) {
      return this.sdkInstance.getProvider();
    }
    return null;
  }

  async getProvider() {
    if (this.sdkInstance) {
      const ethereum = await this.getEthereum()

      return new ethers.BrowserProvider(ethereum);
    }
    return null;
  }

  async getUser() {
    if (this.sdkInstance) {
      const ethereum = await this.getEthereum()

      return await ethereum.request({ method: 'eth_requestAccounts' });
    }
    return null;
  }

  async getBalance() {
    if (this.sdkInstance) {
      const ethereum = await this.getEthereum()

      const provider = await this.getProvider()

      const balance = await provider.getBalance(
        ethereum.selectedAddress
      );

      return ethers.formatEther(balance);
    }
    return null;
  }

  async contract() {
    if (this.sdkInstance) {
      const provider = await this.getProvider()

      const signer = await provider.getSigner();

      return new ethers.Contract("0x9b0164272ca6744eb66d8508191Ff6fAA8475b1a", abi.abi, signer);
    }
    return null;
  }

  async totalInContract() {
    if (this.sdkInstance) {
      const contract = await this.contract()

      return await contract.totalInContract();
    }
    return null;
  }

}

const singletonSDKInstance = new SingletonSDK();

export default singletonSDKInstance;
