import {ethers} from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

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
  const lockedAmount = ethers.utils.parseEther("1");
  const account = wallet.connect(provider);

  const Lock = await ethers.getContractFactory("Lock", account);
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
