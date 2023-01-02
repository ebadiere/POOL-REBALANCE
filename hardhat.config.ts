import "dotenv/config.js";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mainnet: {
      url: process.env.INFURA_API_KEY
    }
  }
};

export default config;
