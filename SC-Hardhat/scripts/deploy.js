// scripts/deploy.js

const { ethers } = require("hardhat");

async function main() {
    // Retrieve the contract factories
    const UserRegistery = await ethers.getContractFactory("UserRegistery");
    const Marketplace = await ethers.getContractFactory("Marketplace");

    // Deploy UserRegistery contract
    console.log("Deploying UserRegistery...");
    const userRegistery = await UserRegistery.deploy();
    await userRegistery.deployed();
    console.log("UserRegistery deployed to:", userRegistery.address);

    // Deploy Marketplace contract, passing UserRegistery address to the constructor
    console.log("Deploying Marketplace...");
    const marketplace = await Marketplace.deploy();
    marketplace.setUserRegistry(userRegistery.address)
    await marketplace.deployed();
    console.log("Marketplace deployed to:", marketplace.address);

    console.log("Deployment completed successfully.");
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
