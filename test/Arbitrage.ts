import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {Contract} from "ethers";

describe("Arbitrage",  () =>{
    // Set up purchase of 100 WETH using ETH to be used in further trades
    // const tokenIn = "";
    const ETH_ADDRESS: string = "0x0000000000000000000000000000000000000000";
    const SHIB_ADDRESS: string = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
    const WETH_ADDRESS: string = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    const ROUTER_ADDRESS: string = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
    let singleSwap: Contract;

    const abi = [
        "function swapExactInputSingle(" +
        "address tokenIn, " +
        "address tokenOut, " +
        "address sender, " +
        "address recipient, " +
        "uint24 poolFee, " +
        "uint256 amountIn) " +
        "external returns (uint256 amountOut)"
    ];

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
        singleSwap = await SingleSwap.deploy(ROUTER_ADDRESS);
        singleSwap = new ethers.Contract(singleSwap.address, abi, wallet);

        return singleSwap;
    }

    // Refactor this to simply create the trade using the SDK and the pool
    describe("It should deploy the SingleSwap contract", async () => {
        if(singleSwap == null){
            singleSwap = await loadFixture(deploySingleSwap);
        }

        singleSwap.swapExactInputSingle()
    })

});