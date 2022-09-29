const { expect } = require("chai");
const { ethers } = require("hardhat");
const {BigNumber} = require("ethers");

describe("VME50", function () {
    let contract;
    let VME50Contract;
    let owner;
    let user1;
    let user2;
    let addrs;

    beforeEach(async function () {
        [owner, user1, user2, ...addrs] = await ethers.getSigners();
        VME50Contract = await ethers.getContractFactory("VMe50", owner);
        contract = await VME50Contract.deploy();
    });

    // Check default value at deployment
    describe("Check default value at deployment", function () {
        // Total supply checking
        it("Total supply should be 6402000", async function () {
            const totalSupply = await contract.supplyAmount();
            const decimals = BigNumber.from(10).pow(18);
            expect(totalSupply).to.equal(BigNumber.from(6402000).mul(decimals));
        });
    });

    describe("Check mint", function () {
        it("Should mint 1000 VME50", async function () {
            await contract.connect(user1).mint(1000);
            expect(await contract.balanceOf(user1.address)).to.equal(1000);
        });
    });

    describe("Check Transfer", function () {
        it("Should transfer 1000 VME50 from user1 to user2", async function () {
            await contract.connect(user1).mint(1000);
            await contract.connect(user1).transfer(user2.address, 1000);
            expect(await contract.balanceOf(user2.address)).to.equal(1000);
        });
    });
});
