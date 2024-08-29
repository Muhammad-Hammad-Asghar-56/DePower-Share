// import {abi} from "../../../SC-Hardhat/artifacts/contracts/User.sol/UserRegistery.json";
const userRegistory_address="0x5FbDB2315678afecb367f032d93F642f64180aa3";
const userRegistory_abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "houseId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "houseAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "powerUnits",
				"type": "uint256"
			}
		],
		"name": "AddHouse",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "loyaltyPoints",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "enum UserRegistery.CouponsEnum",
						"name": "name",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "disc",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "numOfCoupons",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct UserRegistery.Couponse[]",
				"name": "personalCoupons",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "houseAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "powerUnits",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct UserRegistery.House[]",
				"name": "houses",
				"type": "tuple[]"
			}
		],
		"name": "UserDataUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Users",
		"outputs": [
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "loyalityPoints",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAdd",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "couponEnum",
				"type": "uint256"
			}
		],
		"name": "availDiscount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum UserRegistery.CouponsEnum",
				"name": "couponName",
				"type": "uint8"
			}
		],
		"name": "buyCoupons",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAdd",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "houseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numOfUnits",
				"type": "uint256"
			}
		],
		"name": "deductUnits",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "houseId",
				"type": "uint256"
			}
		],
		"name": "deleteHouse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "houseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "noOfUnits",
				"type": "uint256"
			}
		],
		"name": "depositUnits",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUserCoupons",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum UserRegistery.CouponsEnum",
						"name": "name",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "disc",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "numOfCoupons",
						"type": "uint8"
					}
				],
				"internalType": "struct UserRegistery.Couponse[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "houseId",
				"type": "uint256"
			}
		],
		"name": "getUserHouse",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "houseAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "powerUnits",
						"type": "uint256"
					}
				],
				"internalType": "struct UserRegistery.House",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "houses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "houseAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "powerUnits",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "isValidUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "houseId",
				"type": "uint256"
			}
		],
		"name": "isValidUserHouse",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "houseAddr",
				"type": "string"
			}
		],
		"name": "registerNewHouse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
export {
    userRegistory_address,
    userRegistory_abi
}