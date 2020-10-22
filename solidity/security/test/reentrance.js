const EtherStore = artifacts.require("EtherStore");
const EtherStoreAttack = artifacts.require("EtherStoreAttack");

contract("EtherStoreAttack", ()=>{
    before(async () => {
        this.accounts = await web3.eth.getAccounts();
        this.es = await EtherStore.new();
        this.esa = await EtherStoreAttack.new();
        // connect attacker to new ether store
        await this.esa.setEtherStoreAddress(this.es.address);

        // deposit 5 ether from account 1
        await this.es.depositFunds({"from":this.accounts[1], "value": web3.utils.toWei("5")});
        // deposit 5 ether from account 2
        await this.es.depositFunds({"from":this.accounts[2], "value": web3.utils.toWei("5")});
    });
    it("carry out attack",async ()=>{
        await this.esa.attackEtherStore({"from":this.accounts[3], "value": web3.utils.toWei("1")});
        await web3.eth.getBalance(this.es.address).then(async balance => this.esbalance = await web3.utils.fromWei(balance));
        assert.equal(this.esbalance, 0);
    });
});