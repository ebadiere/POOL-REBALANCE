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
    let weth9: Contract;

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

    const WETH9ABI = [
        {
            "name": "deposit",
            "inputs": [],
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            name: 'balanceOf',
            type: 'function',
            inputs: [
                {
                    name: '_owner',
                    type: 'address',
                },
            ],
            outputs: [
                {
                    name: 'balance',
                    type: 'uint256',
                },
            ],
            constant: true,
            payable: false,
        }
    ];

    before( (done) => {
        exchangeEthForWeth().then(() => done())
    })

    let exchangeEthForWeth = async () => {
        const nodeUrl = process.env.NODE_URL;
        if (!nodeUrl){
            console.log("Node URL not set!");
            process.exit(1);
        }
        const provider = ethers.getDefaultProvider(nodeUrl);
        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey){
            console.log("Private key not set!");
            process.exit(1);
        }
        const wallet = new ethers.Wallet(privateKey, provider);
        // const account = wallet.connect(provider);
        weth9 = new ethers.Contract(WETH_ADDRESS, WETH9ABI, wallet);
        const tx = await weth9.deposit({value: ethers.utils.parseEther('100')});
        const receipt = await tx.wait();
        console.log((`Receipt transaction hash: ${receipt["transactionHash"]}`));


        const balance = await weth9.balanceOf(wallet.address);

        console.log(`Balance: ${balance.toString()}`);
    }


    describe("It should run a pair exchange", async () => {

        it('Should wait for the setup to complete', async () => {
            if (weth9 == null){
                await loadFixture(exchangeEthForWeth);
            }

        })
    })

});