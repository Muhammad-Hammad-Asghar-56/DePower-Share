// import abi from "../../../SC-Hardhat/artifacts/contracts/MarketPlace.sol/Marketplace.json";
const marketPlace_address="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const marketPlace_abi=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "adIds",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "consumers",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "houseAddresses",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "demandUnits",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "arrangedUnits",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "string[]",
				"name": "dates",
				"type": "string[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "prices",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "enum Marketplace.AdStatusEnum[]",
				"name": "statuses",
				"type": "uint8[]"
			}
		],
		"name": "AdsList",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "consumer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "houseAddress",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "demandUnits",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "arrangedUnits",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pricePerUnit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum Marketplace.AdStatusEnum",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "NewAd",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_consumer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_producer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "discountPercentage",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "numOfUnits",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "adId",
				"type": "uint256"
			}
		],
		"name": "OrderPlaced",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Ads",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_consumer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "houseAddress",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "demandUnits",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "arrangedUnits",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pricePerUnit",
				"type": "uint256"
			},
			{
				"internalType": "enum Marketplace.AdStatusEnum",
				"name": "status",
				"type": "uint8"
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
			},
			{
				"internalType": "uint256",
				"name": "demandUnits",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pricePerUnit",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			}
		],
		"name": "addAd",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "adId",
				"type": "uint256"
			}
		],
		"name": "cancelAd",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "emitAllAds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAds",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_consumer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "houseAddress",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "demandUnits",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "arrangedUnits",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "pricePerUnit",
						"type": "uint256"
					},
					{
						"internalType": "enum Marketplace.AdStatusEnum",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct Marketplace.Ad[]",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_consumer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_producer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "discountPercentage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numOfUnits",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "adId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "adId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fromHouseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numOfUnitsDeliver",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "couponNum",
				"type": "uint256"
			}
		],
		"name": "placeOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IUser",
				"name": "_userReg",
				"type": "address"
			}
		],
		"name": "setUserRegistory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userRegistery",
		"outputs": [
			{
				"internalType": "contract IUser",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export  {
    marketPlace_address,
    marketPlace_abi
}