// SPDX-License-Identifier: MIT
import "./IUser.sol";

contract Marketplace {
    enum AdStatusEnum{
        Canceled,Sold,Live 
    }
    
    struct Ad{
        uint id;
        address _consumer;
        uint houseAddress;
        uint demandUnits;
        uint arrangedUnits;
        string date;
        uint pricePerUnit;
        AdStatusEnum status;
    }
    struct  Order{
        uint orderId;
        address _consumer; // User who Demand the Power
        address _supplier; // User who supply the Power
        uint discountPercentage;
        uint numOfUnits;
        uint adId;
    }

    uint id=0;
    mapping(uint => Ad) public Ads;

    uint orderCount=0;
    mapping(uint=>Order) public orders;
    
    address public owner;
    IUser public userRegistery; 

    function setUserRegistory(IUser _userReg) public{
        userRegistery=_userReg;
    }
    
    /* 
     * Function to add a new Ad to the marketplace 
     * Validates user and house registration, then creates an Ad
     */
    function addAd(uint houseId, uint demandUnits, uint pricePerUnit,string memory date) external {
        require(userRegistery.isValidUser(msg.sender),"User has not registered yet. Register the account");
        require(userRegistery.isValidUserHouse(msg.sender,houseId),"House is not registered.");
        // userRegistery.deductUnits(msg.sender,houseId,demandUnits);
        
        Ads[id] = Ad({
            id: id,
            _consumer: msg.sender,
            houseAddress: houseId,
            demandUnits: demandUnits,
            arrangedUnits: 0,
            date:date,
            pricePerUnit:pricePerUnit,
            status :AdStatusEnum.Live
        });
        emit NewAd(id, msg.sender, houseId, demandUnits, 0, date, pricePerUnit, AdStatusEnum.Live);
        id++;
    }
    
    /* 
     * Function to place an order in response to an Ad 
     * Validates user, coupon, and Ad status, then updates the Ad and creates an order
     */
    function placeOrder(uint adId,uint fromHouseId, uint numOfUnitsDeliver, uint couponNum) external {
        require(userRegistery.isValidUser(msg.sender),"User has not registered yet. Register the account");
        
        if(Ads[adId].status != AdStatusEnum.Live){
            revert("Ad Doesn't Exist");
        }

        Ad storage ad = Ads[adId];
        uint discount = 0;
        if(couponNum > 0){
            discount = userRegistery.availDiscount(msg.sender,couponNum-1);
        }
                
        userRegistery.deductUnits(msg.sender, fromHouseId, numOfUnitsDeliver); // Deduct from producer house
        
        ad.arrangedUnits += numOfUnitsDeliver; // Update the Ad's arranged units

        orders[orderCount++] = Order({        // Create and store a new Order
            orderId:orderCount,
            _consumer: ad._consumer,
            _supplier: msg.sender,
            discountPercentage: discount,
            numOfUnits: numOfUnitsDeliver , 
            adId:ad.id
        });
        
        // Deposit the units to the consumer's house
        userRegistery.depositUnits(ad.houseAddress,numOfUnitsDeliver);
    }
    
    /*
    * Function to emit all Ads stored in the contract
    * Gathers all Ads and emits them as a list
    */
    function emitAllAds() public {
        Ad[] memory allAds = getAllAds();
        uint[] memory adIds = new uint[](allAds.length);
        address[] memory consumers = new address[](allAds.length);
        uint[] memory houseAddresses = new uint[](allAds.length);
        uint[] memory demandUnits = new uint[](allAds.length);
        uint[] memory arrangedUnits = new uint[](allAds.length);
        string[] memory dates = new string[](allAds.length);
        uint[] memory prices = new uint[](allAds.length);
        AdStatusEnum[] memory statuses = new AdStatusEnum[](allAds.length);
        
        // Populate arrays with data from each Ad
        for (uint i = 0; i < allAds.length; i++) {
            Ad memory ad = allAds[i];
            adIds[i] = ad.id;
            consumers[i] = ad._consumer;
            houseAddresses[i] = ad.houseAddress;
            demandUnits[i] = ad.demandUnits;
            arrangedUnits[i] = ad.arrangedUnits;
            dates[i] = ad.date;
            prices[i] = ad.pricePerUnit;
            statuses[i] = ad.status;
        }

        emit AdsList(adIds, consumers, houseAddresses, demandUnits, arrangedUnits, dates, prices, statuses);
    }
    
    /*
    * Function to retrieve all Ads from the marketplace
    * Returns an array of Ads
    */
    function getAllAds() public view returns (Ad[] memory) {
        Ad[] memory allAds = new Ad[](id-1);
        for (uint i = 1; i < id; i++) {
            allAds[i - 1] = Ads[i];
        }
        return allAds;
    }

    event NewAd(
        uint id, 
        address consumer, 
        uint houseAddress, 
        uint demandUnits, 
        uint arrangedUnits, 
        string date, 
        uint pricePerUnit, 
        AdStatusEnum status
    );
    // Event for emitting ads list
    event AdsList(
        uint[] adIds, 
        address[] consumers,
        uint[] houseAddresses,
        uint[] demandUnits,
        uint[] arrangedUnits,
        string[] dates,
        uint[] prices,
        AdStatusEnum[] statuses
    );
}