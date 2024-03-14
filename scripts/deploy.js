const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const initialSupply = ethers.parseUnits("1000", 18);
  const SteakContract = await await hre.ethers.deployContract("Steak", [initialSupply, deployer.address]);

  await SteakContract.waitForDeployment();
  const balance = await SteakContract.balanceOf(deployer.address);
  console.log(`Balance of ${deployer.address}: ${balance.toString()} tokens`);
  console.log(`Contract deployed to ${SteakContract.target}`);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});