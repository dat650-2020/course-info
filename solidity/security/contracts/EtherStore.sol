pragma solidity 0.5.11;

contract EtherStore {
    uint256 public withdrawalLimit = 1 ether;
    mapping(address => uint256) public lastWithdrawTime;
    mapping(address => uint256) public balances;

    function depositFunds() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawFunds(uint256 _weiToWithdraw) public {
        require(balances[msg.sender] >= _weiToWithdraw);
        // limit the withdrawal
        require(_weiToWithdraw <= withdrawalLimit);
        // limit the time allowed to withdraw
        require(now >= lastWithdrawTime[msg.sender] + 1 weeks);
        // msg.sender.transfer(_weiToWithdraw);
        // balances[msg.sender] -= _weiToWithdraw;
        // lastWithdrawTime[msg.sender] = now;

        // (bool success, bytes memory data) = msg.sender.call.value(_weiToWithdraw)("");
        bool success = msg.sender.send(_weiToWithdraw);
        if (success) {
            balances[msg.sender] -= _weiToWithdraw;
            lastWithdrawTime[msg.sender] = now;
        }
    }
}
