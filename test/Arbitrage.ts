import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Arbitrage",  () =>{
    // Set up purchase of 100 WETH using ETH to be used in further trades
    // const tokenIn = "";
    const ETH_ADDRESS = "0x0000000000000000000000000000000000000000";
    const SHIB_ADDRESS = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
    const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    const ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";


    let deploySingleSwap = async () => {
        const nodeUrl = process.env.NODE_URL;
        if (!nodeUrl){
            console.log("Node URL not set!");
            process.exit(1);
        }
        const provider = await ethers.getDefaultProvider(nodeUrl);
        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey){
            console.log("Private key not set!");
            process.exit(1);
        }
        const wallet = new ethers.Wallet(privateKey, provider);
        const account = wallet.connect(provider);

        const SingleSwap = await ethers.getContractFactory("SingleSwap", account);
        const singleSwap = await SingleSwap.deploy(ROUTER_ADDRESS);

        return singleSwap;
    }

    describe("It should deploy the SingleSwap contract", async () => {
        const singleSwap = await loadFixture(deploySingleSwap);
        expect(singleSwap.address).to.not.be.null;
    })

});