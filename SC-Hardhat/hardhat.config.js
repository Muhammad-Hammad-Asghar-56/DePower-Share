/** @type import('hardhat/config').HardhatUserConfig */

require('hardhat/config').HardhatUserConfig
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();


const { API_KEY, ALCHEMY_API_KEY, SEPOLIA_PRIVATE_KEY } = process.env;


module.exports = {
  solidity: "0.8.24",
  etherscan:{
    apiKey:API_KEY
  },
  networks:{
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[SEPOLIA_PRIVATE_KEY],
      chainId:11155111
    },
    localHost:{
      url:`http://127.0.0.1:8545/`,
      chainId:31337
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
};
