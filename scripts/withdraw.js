const { expect } = require('chai');

async function main() {
  const [owner] = await ethers.getSigners();
  const initialSupply = ethers.parseUnits("1000", 18);
  const SteakContract = await await hre.ethers.deployContract("Steak", [initialSupply, owner.address]);
  await SteakContract.waitForDeployment();

  const ethAmount = ethers.parseUnits("10", 18);
  await SteakContract.connect(owner).mint(owner.address, ethAmount);

  const ethAmountStake = ethers.parseUnits("10", 18);
  await SteakContract.connect(owner).stake(ethAmountStake);

  const initialBalance = await SteakContract.balanceOf(owner.address);
  console.log("Address initial balance before withdraw:", initialBalance.toString());

  const stakedBalance = await SteakContract.getStake(owner.address);
  console.log("Staking successful. Staked balance of Address:", stakedBalance.toString());

  await new Promise(resolve => setTimeout(resolve, 10000));
  await SteakContract.connect(owner).withdraw();

  const stakedBalanceAfterWithdrawal = await SteakContract.getStake(owner.address);
  console.log("Withdrawal successful. Staked balance of Address after withdrawal:", stakedBalanceAfterWithdrawal.toString())

  const finalBalance = await SteakContract.balanceOf(owner.address);
  console.log("Address final balance after withdraw:", finalBalance.toString());
  console.log(`Contract deployed to ${SteakContract.target}`);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});