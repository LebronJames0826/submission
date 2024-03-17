const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const initialSupply = ethers.parseUnits("1000", 18);
  const SteakContract = await await hre.ethers.deployContract("Steak", [initialSupply, owner.address]);
  await SteakContract.waitForDeployment();

  const ethAmount = ethers.parseUnits("10", 18);
  await SteakContract.connect(owner).mint(owner.address, ethAmount);
  
  const balance = await SteakContract.balanceOf(owner.address);
  console.log("Minting successful. Balance of addr1:", balance.toString());
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});