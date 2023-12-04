const ethers = require('ethers');
require('dotenv').config();

async function main() {

  const url = process.env.GOERLI_URL;

  let artifacts = await hre.artifacts.readArtifact("Lottery");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Lottery Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let lottery = await factory.deploy();

  console.log("Lottery address:", lottery.address);

  await lottery.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});