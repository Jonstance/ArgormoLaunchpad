require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan")
const { mnemonic, privateKey, bscScanApiKey } = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

//For extra HELP on how to add other networks... 
//Go here: https://github.com/mingderwang/bsc-hardhat-template/blob/main/hardhat.config.js

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  //solidity: "0.8.4",
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ethScanApiKey
  },
  defaultNetwork: "rinkebybtestnet",
  networks: {
   
    rinkebytestnet: {
      url: "https://rinkeby.infura.io/v3/",
      chainId: 4,
      accounts: [privateKey]
    }
    
  },
solidity: {
  version: "0.8.4",
  settings: {
    optimizer: {
      enabled: true
    }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};
