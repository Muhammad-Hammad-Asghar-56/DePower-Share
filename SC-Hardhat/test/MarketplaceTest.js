const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace Contract", function () {
    // let Marketplace;
    // let marketplace;
    // let UserRegistery;
    // let userRegistery;
    // let owner;
    // let addr1;
    // let addr2;
    // let addrs;

    // beforeEach(async function () {
    //     // Deploy UserRegistery contract and Marketplace contract
    //     UserRegistery = await ethers.getContractFactory("UserRegistery");
    //     Marketplace = await ethers.getContractFactory("Marketplace");
        
    //     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    //     userRegistery = await UserRegistery.deploy();
    //     await userRegistery.deployed();
        
    //     marketplace = await Marketplace.deploy(userRegistery.address);
    //     await marketplace.deployed();

    //     // Register users and their houses
    //     await userRegistery.connect(addr1).registerUser();
    //     await userRegistery.connect(addr1).registerNewHouse("house1");
    //     await userRegistery.connect(addr2).registerUser();
    //     await userRegistery.connect(addr2).registerNewHouse("house2");
    //     await userRegistery.connect(owner).shiftOwnership(marketplace);
    // });

    // describe("Deployment", function () {
    //     it("Should set the right owner", async function () {
    //         expect(await marketplace.owner()).to.equal(owner.address);
    //     });
    // });

    // describe("Ad Management", function () {
    //     it("Should add a new ad", async function () {
    //         await marketplace.connect(addr1).addAd("house1", 100, 10);

    //         const ad = await marketplace.Ads(1);
    //         expect(ad._consumer).to.equal(addr1.address);
    //         expect(ad.houseAddress).to.equal("house1");
    //         expect(ad.demandUnits).to.equal(100);
    //         expect(ad.pricePerUnit).to.equal(10);
    //         expect(ad.status).to.equal(2); // AdStatusEnum.Live
    //     });

    //     it("Should cancel an ad", async function () {
    //         await marketplace.connect(addr1).addAd("house1", 100, 10);
    //         await marketplace.connect(addr1).cancelAd(1);

    //         const ad = await marketplace.Ads(1);
    //         expect(ad.status).to.equal(0); // AdStatusEnum.Canceled
    //     });
    // });

    // describe("Orders", function () {
    //     it("Should place an order", async function () {
    //         await marketplace.connect(addr1).addAd("house1", 100, 10);

    //         // Buy a coupon (assuming couponEnum = 1 for Coupon5)
    //         await userRegistery.connect(addr2).buyCoupons(1); 

    //         await marketplace.connect(addr2).order(1, 50, "house2", 1);

    //         const order = await marketplace.orders(0);
    //         expect(order._consumer).to.equal(addr1.address);
    //         expect(order._producer).to.equal(addr2.address);
    //         expect(order.numOfUnits).to.equal(50);
    //         expect(order._consumerHouse).to.equal("house2");
    //     });
    // });
});
