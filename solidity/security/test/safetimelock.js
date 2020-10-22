// Import all required modules from openzeppelin-test-helpers
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const SafeTimeLock = artifacts.require("SafeTimeLock");

// Using async/await
contract("SafeTimeLock", () => {
    before(async () => {
        this.accounts = await web3.eth.getAccounts();
        this.tl = await SafeTimeLock.new();
        // should be locked for 1 week
        await this.tl.deposit({ "value": 2 * web3.utils.unitMap.ether });
        // use getter
        this.time = await this.tl.lockTime(this.accounts[0]);
    })
    it("timelock later than now", async () => {
        let lastblocktime = 0;
        web3.eth.getBlockNumber()
            .then(number => web3.eth.getBlock(number))
            .then(block => lastblocktime = block.timestamp);
        assert.isAbove(this.time.toNumber(), lastblocktime);
    })

    it("timelock prevents withdrawal", async () => {
        await expectRevert(this.tl.withdraw(), "revert");
    })

    it("timelock cannot be exploited", async () => {
        // bignmumber = 2**256
        let bignumber = new BN("115792089237316195423570985008687907853269984665640564039457584007913129639936")
        // use getter
        bignumber = bignumber.sub(this.time);
        await expectRevert(this.tl.increaseLockTime(bignumber.toString()), "revert SafeMath: addition overflow");
    }
    )
});