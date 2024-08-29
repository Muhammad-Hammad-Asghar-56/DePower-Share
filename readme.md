# DePower Share: Deceneralized Power Shared Grid

This project consists of Solidity smart contracts designed for a user registry and marketplace system, where users can register, manage houses, deposit power units, and buy coupons. The marketplace allows users to sell power units. This README provides an overview of the smart contracts, their functionalities, and usage instructions.

## Table of Contents

- [Contracts Overview](#contracts-overview)
- [Deployment](#deployment)
- [Usage](#usage)
  - [UserRegistery](#userregistery)
  - [Marketplace](#marketplaces)
- [License](#license)

## Contracts Overview

### UserRegistery

The `UserRegistery` contract allows users to register, manage houses, deposit power units, and buy coupons. The key functionalities include:

- **User Registration**: Users can register themselves.
- **House Management**: Users can register houses and deposit power units.
- **Coupons**: Users can buy coupons using their loyalty points.

### Marketplace

The `Marketplace` contract allows users to place bids for selling power units. It interacts with the `UserRegistery` contract to verify user and house information.

## Deployment

To deploy the contracts, follow these steps:

1. Install [Solidity](https://docs.soliditylang.org/) and a suitable development environment such as [Remix](https://remix.ethereum.org/).

2. Compile the `UserRegistery` and `Marketplace` contracts.

3. Deploy the `UserRegistery` contract first and note down its address.

4. Deploy the `Marketplace` contract, passing the address of the deployed `UserRegistery` contract to its constructor.

## Usage

### UserRegistery

#### Register a New User

```solidity
function registerUser() public;
```

#### Deposit Power Units
```solidity
function DepositUnits(address houseAdd,uint num_Of_Units) public;
```
#### Widthdrawal Power Units
```solidity
function withdrawalUnits(string calldata houseAddr, uint256 noOfUnits) public;
```

#### Buy Coupons
```solidity
function buyCoupons(CouponsEnum couponName) public;
```


### Marketplace
#### addBid
```solidity
function addBid(uint256 numOfUnits, uint256 pricePerUnit) public returns (bool);
Places a bid for selling power units.
```

#### startOrder
```solidity
function startOrder() public returns (bool);
```