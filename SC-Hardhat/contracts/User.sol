// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./IUser.sol";

// is IUser
contract  UserRegistery is IUser {
    enum CouponsEnum {
        Coupon2,
        Coupon5,
        Coupon10
    }

    //                               Structures
    struct Couponse {
        CouponsEnum name;
        uint8 disc;
        uint8 numOfCoupons;
    }
    
    struct House{
        uint id;
        string houseAddress;
        uint256 powerUnits;
    }

    struct User { // add the machine's company account as an admn to approve the listing
        address walletAddress;
        uint loyalityPoints;
        uint[] houses;
        mapping(CouponsEnum => Couponse) personal_Couponse;
    }

    //                               Global Variables
    mapping(address => User) public Users;
    mapping(uint=>House) public houses;
    
    uint houseCount=0;
    
    //                                  Modifiers
    modifier onlyCustomer(address addr){
        require(Users[addr].walletAddress != address(0),"Caller is not a Register Customer");
        _;
    }

    //                      Events
    event UserDataUpdated(
        address indexed userAddress,
        uint loyaltyPoints,
        Couponse[] personalCoupons,
        House[] houses
    );
    event AddHouse(
        uint houseId,
        string houseAddress,
        uint powerUnits
    );

    //                                 Interface Calls (Externals)
    
    function isValidUser(address addr) onlyCustomer(addr)  external view returns(bool) {
        return Users[addr].walletAddress != address(0);
    }

    
    /* Deposit the units in the user account*/
    function depositUnits(uint houseId, uint256 noOfUnits) external override  { 
        require(noOfUnits > 0, "No of Units must be greater than 1.");
        
        houses[houseId].powerUnits += noOfUnits; // Add power units to the house
    }
    
    /* Deduct the units from the user house when they transfer the power*/
    function deductUnits(address userAdd,uint houseId,uint numOfUnits) onlyCustomer(userAdd) external override  {
        require(Users[userAdd].walletAddress != address(0), "User does't Exist");
        
        // Check if the user owns the house
        if(! isValidUserHouse(userAdd, houseId)){
            revert("User doesn't have registered house Id");
        }
        
        require(houses[houseId].powerUnits >= numOfUnits,"User should have power units in their account.");
        
        // Deduct power units from the house and add loyalty points to the user
        houses[houseId].powerUnits -= numOfUnits;
        User storage user=Users[userAdd];
        user.loyalityPoints += numOfUnits;
    }

     /* Function to check if a user has enough coupons to avail a discount */
    function availDiscount(address userAdd,uint couponEnum) onlyCustomer(userAdd) external override returns(uint){
        CouponsEnum coupon = CouponsEnum(couponEnum);
        User storage user = Users[userAdd];
        
        if(user.personal_Couponse[coupon].numOfCoupons < 1){
            revert("Doesn't have enough coupon to avail discounts");
        }

        // Decrement the number of coupons and return the discount value
        user.personal_Couponse[coupon].numOfCoupons=user.personal_Couponse[coupon].numOfCoupons-1;
        return user.personal_Couponse[coupon].disc;
    }

    //                                        Public Calls
    function registerUser() public {
        if(Users[msg.sender].walletAddress != address(0)){
            emitUserData(msg.sender);  // Emit event if user is already registered
            return;
        }

        // Register new user and initialize loyalty points and coupons
        User storage user = Users[msg.sender];
        user.walletAddress = msg.sender;
        user.loyalityPoints = 10000;
        
        // Initialize the three types of coupons with 0 quantity
        user.personal_Couponse[CouponsEnum.Coupon2] = Couponse({
            name: CouponsEnum.Coupon2,
            disc: 2,
            numOfCoupons: 0
        });

        user.personal_Couponse[CouponsEnum.Coupon5] = Couponse({
            name: CouponsEnum.Coupon5,
            disc: 5,
            numOfCoupons: 0
        });

        user.personal_Couponse[CouponsEnum.Coupon10] = Couponse({
            name: CouponsEnum.Coupon10,
            disc: 10,
            numOfCoupons: 0
        });
        
        emitUserData(msg.sender);
    }

     /* Public function to register a new house for the user */
    function registerNewHouse(string memory houseAddr) public {
        User storage user = Users[msg.sender];
        require(user.walletAddress != address(0), "User is not registered");

        // Check if house already exists
        for (uint i = 0; i < user.houses.length; i++) {
            if (keccak256(abi.encodePacked(houses[user.houses[i]].houseAddress)) == keccak256(abi.encodePacked(houseAddr))) {
                revert("House already exists");
            }
        }

        // Increment house count and add new house
        House memory newHouse = House(houseCount, houseAddr, 0);
        houses[houseCount] = newHouse;
        user.houses.push(houseCount);
        houseCount++;
        
        emitUserHouseData(newHouse.id);
    }
    
    function deleteHouse(uint houseId) onlyCustomer(msg.sender) public {
        // Check if the user owns the house
        if(!isValidUserHouse(msg.sender, houseId)){
            revert("User Do not own this house");
        }

        delete houses[houseId];
        User storage user = Users[msg.sender];

        // Remove the house from mapping and update the user's house list
        for (uint i = 0; i < user.houses.length; i++) {
            if (user.houses[i] == houseId) {
                user.houses[i] = user.houses[user.houses.length - 1]; // Replace with the last element
                user.houses.pop(); // Remove the last element
                break;
            }
        }
    }

    /* Public function to buy coupons using loyalty points */
    function buyCoupons(CouponsEnum couponName) public    {
        User storage user = Users[msg.sender];

        uint8 disc = 0;
        if (couponName == CouponsEnum.Coupon2) {
            disc = 2;
        } else if (couponName == CouponsEnum.Coupon5) {
            disc = 5;
        } else if (couponName == CouponsEnum.Coupon10) {
            disc = 10;
        }
        require(user.loyalityPoints > disc*10,"Dont have enough points to buy");
        user.loyalityPoints -= disc*10;
        user.personal_Couponse[couponName] =  Couponse({name: couponName, disc: disc, numOfCoupons: 1});

        emitUserData(msg.sender); // Emit event with updated user data
    }

    
    function getAllUserCoupons() public view returns (Couponse[] memory) {
        Couponse[] memory allCoupons = new Couponse[](3); // Assuming 3 types of coupons
        
        allCoupons[uint(CouponsEnum.Coupon2)] = Users[msg.sender].personal_Couponse[CouponsEnum.Coupon2];
        allCoupons[uint(CouponsEnum.Coupon5)] = Users[msg.sender].personal_Couponse[CouponsEnum.Coupon5];
        allCoupons[uint(CouponsEnum.Coupon10)] = Users[msg.sender].personal_Couponse[CouponsEnum.Coupon10];
        
        return allCoupons;
    }

    /* Public function to get the details of a specific house */
    function getUserHouse(uint houseId)  public view returns(House memory)  {
        require(Users[msg.sender].walletAddress != address(0),"User doesn't Exist");
        require(isValidUserHouse(msg.sender, houseId),"House doesn't Exist under this User");
        return houses[houseId];
    }
        
    /* Public function to check if a user owns a specific house */
    function isValidUserHouse(address addr,uint houseId) onlyCustomer(addr) public view returns(bool) {
        User storage user=Users[addr];
        // Check if the house ID exists in the user's house list
        for (uint i = 0; i < user.houses.length; i++) {
            if (user.houses[i] == houseId) {
                return true;
            }
        }
        return false;
    }

    function emitUserData(address userAddress) internal {
        User storage user = Users[userAddress];

        Couponse[] memory coupons = new Couponse[](3);
        coupons[uint(CouponsEnum.Coupon2)] = user.personal_Couponse[CouponsEnum.Coupon2];
        coupons[uint(CouponsEnum.Coupon5)] = user.personal_Couponse[CouponsEnum.Coupon5];
        coupons[uint(CouponsEnum.Coupon10)] = user.personal_Couponse[CouponsEnum.Coupon10];

        uint houseCountTemp = user.houses.length;
        House[] memory userHouses = new House[](houseCountTemp);
        
        for (uint i = 0; i < houseCountTemp; i++) {
            uint houseId = user.houses[i];
            userHouses[i] = houses[houseId];
        }

        emit UserDataUpdated(
            userAddress,
            user.loyalityPoints,
            coupons,
            userHouses
        );
    }

    function emitUserHouseData(uint houseId) internal {
        
        House memory userNewHouse = houses[houseId];
        
        emit AddHouse(
            userNewHouse.id,
            userNewHouse.houseAddress,
            userNewHouse.powerUnits
        );
    }
}