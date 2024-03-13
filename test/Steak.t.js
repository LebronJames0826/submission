const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  const INITIAL_BALANCE = ethers.parseEther("1000000");
  
  describe("Steak", function () {
    async function deploy() {
      const [account1, account2, account3] = await ethers.getSigners();
  
      const Steak = await ethers.getContractFactory("Steak");
      const cSteak = await Steak.deploy(INITIAL_BALANCE, account1);
  
      return { cSteak, account1, account2, account3 };
    }
  
    describe("Staking", function () {
      it("should call constructor", async function () {
        const { cSteak, account1 } = await loadFixture(deploy);
        const balance = await cSteak.balanceOf(account1.address);
        expect(balance).to.be.eq(INITIAL_BALANCE);
        expect(cSteak).not.to.be.undefined;
      });
  
      it("should be able to mint", async function () {
        const { cSteak, account2 } = await loadFixture(deploy);
        const amount = ethers.parseEther("100");
        await cSteak["mint"](account2.address, amount);
        const balance = await cSteak.balanceOf(account2);
        expect(balance).to.be.eq(amount);
      });
  
      it("should be able to stake", async function () {
        const { cSteak, account2 } = await loadFixture(deploy);
        const amount = ethers.parseEther("100");
        await cSteak["mint"](account2.address, amount);
        await cSteak.connect(account2).stake(amount);
  
        const balance = await cSteak.balanceOf(account2.address);
        expect(balance).to.be.eq(0);
      });
  
      it("should be able to get current rewards", async function () {
        const { cSteak, account2 } = await loadFixture(deploy);
  
        const amount = ethers.parseEther("100");
        await cSteak["mint"](account2.address, amount);
  
        await cSteak.connect(account2).stake(amount);
  
        const ONE_HOUR_IN_SEC = 60 * 60;
        const unlockTime = (await time.latest()) + ONE_HOUR_IN_SEC;
  
        await time.increaseTo(unlockTime);
  
        const rewards = await cSteak.getCurrentRewards(account2.address);
  
        expect(rewards).to.be.greaterThan(ethers.parseEther("0"));
        //   console.log("current rewards", rewards);
      });
  
      it("should be able to claim rewards", async function () {
        const { cSteak, account2 } = await loadFixture(deploy);
  
        const amount = ethers.parseEther("100");
        await cSteak["mint"](account2.address, amount);
  
        await cSteak.connect(account2).stake(amount);
  
        const ONE_HOUR_IN_SEC = 60 * 60;
        const unlockTime = (await time.latest()) + ONE_HOUR_IN_SEC;
  
        await time.increaseTo(unlockTime);
  
        await cSteak.connect(account2).withdraw();
  
        const balance = await cSteak.balanceOf(account2);
        //   console.log("balance", balance);
      });
  
      // ACTIVITY
      xit("should not be able stake without token");
      xit("should not be able to withdraw withouth a stake");
    });
  });