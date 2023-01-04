import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import path, { resolve } from "path";
import "tsconfig-paths/register";

dotenv.config();
console.log("Config: ", dotenv.config());
console.log("Private Key: ", process.env.PRIVATE_KEY);


const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    infura: {
      url: process.env.INFURA_API_KEY,
      accounts: [ "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" ]
    }
  }
};

export default config;
