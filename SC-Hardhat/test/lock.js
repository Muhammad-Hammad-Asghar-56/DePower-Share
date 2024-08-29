const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserRegistery", function () {
    // let UserRegistery, userRegistery;
    // let owner, addr1, addr2;

    // beforeEach(async function () {
    //     UserRegistery = await ethers.getContractFactory("UserRegistery");
    //     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    //     userRegistery = await UserRegistery.deploy();
    //     await userRegistery.deployed();
    // });

    // it("Should set the right owner", async function () {
    //     expect(await userRegistery.owner()).to.equal(owner.address);
    // });

    // it("Should register a user", async function () {
    //     await userRegistery.registerUser();
    //     const user = await userRegistery.Users(owner.address);
    //     expect(user.walletAddress).to.equal(owner.address);
    // });

    // it("Should not register an already registered user", async function () {
    //     await userRegistery.registerUser();
    //     await expect(userRegistery.registerUser()).to.be.revertedWith("User is already Registered");
    // });

    // it("Should register a new house for a user", async function () {
    //     await userRegistery.registerUser();
    //     await userRegistery.registerNewHouse("123 Main St");
    //     const house = await userRegistery.getUserHouse("123 Main St");
    //     expect(house.houseAddress).to.equal("123 Main St");
    //     expect(house.powerUnits).to.equal(0);
    // });

    // it("Should not register an already existing house", async function () {
    //     await userRegistery.registerUser();
    //     await userRegistery.registerNewHouse("123 Main St");
    //     await expect(userRegistery.registerNewHouse("123 Main St")).to.be.revertedWith("House is Already exists");
    // });

    // it("Should deposit power units to a house", async function () {
    //     await userRegistery.registerUser();
    //     await userRegistery.registerNewHouse("123 Main St");
    //     await userRegistery.depositUnits("123 Main St", 10);
    //     const house = await userRegistery.getUserHouse("123 Main St");
    //     expect(house.powerUnits).to.equal(10);
    // });

    // it("Should not allow buying coupons without enough loyalty points", async function () {
    //     await userRegistery.connect(owner).registerUser();
    //     await expect(userRegistery.connect(owner).buyCoupons(0)).to.be.revertedWith("Dont have enough points to buy");
    // });

    // it("Should validate a user's house", async function () {
    //     await userRegistery.registerUser();
    //     await userRegistery.registerNewHouse("123 Main St");
    //     expect(await userRegistery.isValidUserHouse(owner.address, "123 Main St")).to.be.true;
    // });

    // it("Should deduct units from a user's house by the owner", async function () {
    //     await userRegistery.registerUser();
    //     await userRegistery.registerNewHouse("123 Main St");
    //     await userRegistery.depositUnits("123 Main St", 10);
    //     await userRegistery.deductUnits(owner.address, "123 Main St", 5);
    //     const house = await userRegistery.getUserHouse("123 Main St");
    //     expect(house.powerUnits).to.equal(5);
    // });

    // it("Should withdraw units from a user's house by the owner", async function () {
    //     await userRegistery.registerUser();
    //     await userRegistery.registerNewHouse("123 Main St");
    //     await userRegistery.depositUnits("123 Main St", 10);
    //     await userRegistery.widthrawalUnitsFromOrder(owner.address, "123 Main St", 5);
    //     const house = await userRegistery.getUserHouse("123 Main St");
    //     expect(house.powerUnits).to.equal(15);
    // });

    // it("Should check if a user has a coupon", async function () {
    //     await userRegistery.registerUser();
    //     await userRegistery.buyCoupons(0); // Coupon2
    //     expect(await userRegistery.doesUserHaveCoupon(owner.address, 0)).to.be.true;
    // });

    // it("Should return the discount value of a user's coupon", async function () {
    //     await userRegistery.registerUser();
    //     await userRegistery.buyCoupons(0); // Coupon2
    //     const discount = await userRegistery.availDiscount(owner.address, 0);
    //     expect(discount).to.equal(2);
    // });
});
