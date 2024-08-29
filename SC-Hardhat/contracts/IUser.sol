// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUser {
    function isValidUser(address addr) external view returns(bool);
    function isValidUserHouse(address addr,uint houseId) external view returns(bool);
    function deductUnits(address userAdd,uint houseId, uint numOfUnits) external;
    function availDiscount(address user, uint couponEnum) external returns (uint);
    function depositUnits(uint houseId, uint256 noOfUnits)  external;
}
