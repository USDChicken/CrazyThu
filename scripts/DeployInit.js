const { ethers } = require("hardhat");

async function main() {
    // Deploying VME50 contract
    const MyVME50 = await ethers.getContractFactory("VMe50");
    const myVME50 = await MyVME50.deploy();
    await myVME50.deployed();
    console.log("VMe50 deployed to:", myVME50.address);

    // Deploying USDChicken contract
    const MyUSDCHK = await ethers.getContractFactory("USDChicken");
    const MyUSDCHKV1 = await MyUSDCHK.deploy(myVME50.address);
    await MyUSDCHKV1.deployed();
    console.log("MyUSDCHKV1 deployed to:", MyUSDCHKV1.address);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
