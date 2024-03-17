// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Steak is ERC20, Ownable {
    mapping(address => uint256) private _stakes;
    mapping(address => uint256) private _lastStakeTimestamp;
    uint256 private _rewardRate = 100;

    constructor(
        uint256 initialSupply,
        address initialOwner
    ) ERC20("Steak", "STK") Ownable(initialOwner) {
        _mint(initialOwner, initialSupply);
    }

    function mint(uint256 amount) public {
        _mint(msg.sender, amount * 10 ** 18);
    }

    function stake(uint256 amount) public {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount * 10 ** 18, "Insufficient balance");

        _stakes[msg.sender] += amount * 10 ** 18;
        _lastStakeTimestamp[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), amount * 10 ** 18);
    }

    function withdraw() public {
        require(_stakes[msg.sender] > 0, "No staked tokens");

        uint256 stakedAmount = _stakes[msg.sender];
        uint256 reward = (block.timestamp - _lastStakeTimestamp[msg.sender]) *
            _rewardRate;

        _stakes[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
    }

    function getStake(address account) public view returns (uint256) {
        return _stakes[account];
    }

    function getCurrentRewards(address account) public view returns (uint256) {
        uint256 reward = (block.timestamp - _lastStakeTimestamp[account]) *
            _rewardRate;
        return reward;
    }

    function getLastStakeTimestamp(
        address account
    ) public view returns (uint256) {
        return _lastStakeTimestamp[account];
    }
}