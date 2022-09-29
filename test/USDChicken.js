const {expect} = require("chai");
const {ethers} = require("hardhat");
const {BigNumber} = require("ethers");


describe("USDChicken", function () {
    let contractVME50;
    let VME50Contract;
    let contractUSDCHK;
    let USDCHKContract;
    let owner;
    let user1;
    let user2;
    let addrs;

    beforeEach(async function () {
        [owner, user1, user2, ...addrs] = await ethers.getSigners();
        VME50Contract = await ethers.getContractFactory("VMe50", owner);
        contractVME50 = await VME50Contract.deploy();
        await contractVME50.deployed();
        USDCHKContract = await ethers.getContractFactory("USDChicken", owner);
        contractUSDCHK = await USDCHKContract.deploy(contractVME50.address);
        await contractUSDCHK.deployed();
    });

    // Check default value at deployment
    describe("Check default value at deployment", function () {
        // Total supply checking
        it("First Mint should be 114", async function () {
            const totalSupply = await contractUSDCHK.FIRST_MINT();
            const decimals = BigNumber.from(10).pow(18);
            expect(totalSupply).to.equal(BigNumber.from(114).mul(decimals));
        });
        it("Second Mint should be 514", async function () {
            const totalSupply = await contractUSDCHK.SECOND_MINT();
            const decimals = BigNumber.from(10).pow(18);
            expect(totalSupply).to.equal(BigNumber.from(514).mul(decimals));
        });
        it("Token name should be USDChicken", async function () {
            expect(await contractUSDCHK.name()).to.equal("USDChicken");
        });
        it("Token symbol should be USDCHK", async function () {
            expect(await contractUSDCHK.symbol()).to.equal("USDCHK");
        });
    });

    // Check minting for Round 1
    describe("Check minting round 1", function () {

        // Minting checking from block level
        it('should mint 10 token for user (emit)', async function () {
            expect(await contractUSDCHK.firstMint(10)).to
                .emit(contractUSDCHK, 'Transfer')
                .withArgs(ethers.constants.AddressZero, user1.address, BigNumber.from(10).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 10 token for user (balance)', async function () {
            await contractUSDCHK.connect(user1).firstMint(10);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(10).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 1 token for user (emit)', async function () {
            await contractUSDCHK.connect(user1).firstMint(1);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(1).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 1 token for user (balance)', async function () {
            await contractUSDCHK.connect(user1).firstMint(1);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(1).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 5 token for user (emit)', async function () {
            await contractUSDCHK.connect(user1).firstMint(5);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(5).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 5 token for user (balance)', async function () {
            await contractUSDCHK.connect(user1).firstMint(5);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(5).mul(BigNumber.from(10).pow(18)));
        });
    });

    // failure case for Round 1
    describe("Check minting round 1 failure", function () {
        it('should not allow user to mint more than one time', async function () {
            await contractUSDCHK.connect(user1).firstMint(10);
            expect(await contractUSDCHK.connect(user1).firstMint(10)).to
                .be.revertedWith("You have already claimed your token for this round");
        });

        it('should not allow user to mint more than 10 token', async function () {
            expect(await contractUSDCHK.connect(user1).firstMint(11)).to
                .be.revertedWith("You can only hold 10 USDChicken")
        });

        // it('should not allow user to mint if no more token left', async function () {
        //     await contractUSDCHK.connect(user1).firstMint(10);
        //     await contractUSDCHK.connect(user2).firstMint(10);
        //     expect(await contractUSDCHK.connect(user2).firstMint(5)).to
        //         .be.revertedWith("No more token left for this round")
        // });

        it('should not allow user to mint 0 token', async function () {
            expect(await contractUSDCHK.connect(user1).firstMint(0)).to
                .be.revertedWith("You can not mint 0 USDChicken");
        });

    });

    // Check minting for Round 2
    describe("Check minting round 2", function () {

        // Minting checking from block level
        it('should mint 10 token for user (emit)', async function () {
            expect(await contractUSDCHK.SecondMint(10)).to
                .emit(contractUSDCHK, 'Transfer')
                .withArgs(ethers.constants.AddressZero, user1.address, BigNumber.from(10).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 10 token for user (balance)', async function () {
            await contractUSDCHK.connect(user1).SecondMint(10);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(10).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 1 token for user (emit)', async function () {
            await contractUSDCHK.connect(user1).SecondMint(1);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(1).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 1 token for user (balance)', async function () {
            await contractUSDCHK.connect(user1).SecondMint(1);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(1).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 5 token for user (emit)', async function () {
            await contractUSDCHK.connect(user1).SecondMint(5);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(5).mul(BigNumber.from(10).pow(18)));
        });

        it('should mint 5 token for user (balance)', async function () {
            await contractUSDCHK.connect(user1).SecondMint(5);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(5).mul(BigNumber.from(10).pow(18)));
        });
    });

    // failure case for Round 2
    describe("Check minting round 2 failure", function () {
        it('should not allow user to mint more than one time', async function () {
            await contractUSDCHK.connect(user1).SecondMint(10);
            expect(await contractUSDCHK.connect(user1).SecondMint(10)).to
                .be.revertedWith("You have already claimed your token for this round");
        });

        it('should not allow user to mint more than 10 token', async function () {
            expect(await contractUSDCHK.connect(user1).SecondMint(11)).to
                .be.revertedWith("You can only hold 10 USDChicken")
        });

        it('should not allow user to mint 0 token', async function () {
            expect(await contractUSDCHK.connect(user1).SecondMint(0)).to
                .be.revertedWith("You can not mint 0 USDChicken");
        });

        // it('should not allow user to mint if no more token left', async function () {
        //     await contractUSDCHK.connect(user1).firstMint(10);
        //     await contractUSDCHK.connect(user2).firstMint(10);
        //     expect(await contractUSDCHK.connect(user2).firstMint(5)).to
        //         .be.revertedWith("No more token left for this round")
        // });
    });

    // check burn for VMe50 token
    describe("Check burn", function () {
        // Minting checking from block level
        it('should allow user to burn USDChicken', async function () {
            await contractUSDCHK.connect(user1).firstMint(10);
            await contractUSDCHK.connect(user1).burn(5);
            expect(await contractUSDCHK.balanceOf(user1.address)).to
                .equal(BigNumber.from(5).mul(BigNumber.from(10).pow(18)));
        });

        // Fallback if balance not enough
        it('should not allow user to burn more than balance', async function () {
            await contractUSDCHK.connect(user1).firstMint(10);
            expect(await contractUSDCHK.connect(user1).burn(11)).to
                .be.revertedWith("ERC20: burn amount exceeds balance");
        });

        // burn 5 USDCHK for VME50
        it('should allow user to burn 5 USDChicken for VMe50 token', async function () {
            await contractUSDCHK.connect(user1).firstMint(10);
            await contractUSDCHK.connect(user1).burn(5);
            expect(await contractVME50.balanceOf(user1.address)).to
                .equal(BigNumber.from(50).mul(BigNumber.from(10).pow(18)));
        });

        // burn 10 USDCHK for VME50
        it('should allow user to burn 10 USDChicken for VMe50 token', async function () {
            await contractUSDCHK.connect(user1).firstMint(10);
            await contractUSDCHK.connect(user1).burn(10);
            expect(await contractVME50.balanceOf(user1.address)).to
                .equal(BigNumber.from(100).mul(BigNumber.from(10).pow(18)));
        });

        // Should not allow user to burn 0 USDCHK
        it('should not allow user to burn 0 USDChicken', async function () {
            await contractUSDCHK.connect(user1).firstMint(10);
            expect(await contractUSDCHK.connect(user1).burn(0)).to
                .be.revertedWith("ERC20: burn amount must be greater than 0");
        });

        it('should not allow user to burn number not module to 5 or 10', async function () {
            await contractUSDCHK.connect(user1).firstMint(10);
            await contractUSDCHK.connect(user1).burn(1);
            expect(await contractVME50.balanceOf(user1.address)).to
                .be.revertedWith("USDChicken: must be 5 or 10 modulus");
        });
    });
});
