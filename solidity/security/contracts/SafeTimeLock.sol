// SPDX-License-Identifier: MIT
pragma solidity 0.5.11;

import "./SafeMath.sol";

contract SafeTimeLock {
    using SafeMath for uint256;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public lockTime;

    function deposit() public payable {
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        lockTime[msg.sender] = now.add(1 weeks);
    }

    function increaseLockTime(uint256 _secondsToIncrease) public {
        lockTime[msg.sender] = lockTime[msg.sender].add(_secondsToIncrease);
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "insuficient balance");
        require(now > lockTime[msg.sender], "funds locked");
        uint256 balance = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(balance);
    }
}
