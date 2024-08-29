import { ethers } from "ethers";
import { marketPlace_address, marketPlace_abi } from "./MarketPlaceIndex"; // Adjust path as needed
import { addAd, getAdById } from "../BackendApi/Ads";
import {addOrder} from "../BackendApi/Order";

export class MarketplaceManager {
  constructor() {
    this.provider = new ethers.JsonRpcProvider('http://localhost:8545');
    this.signer = null;
    this.contract = null;

  }


  async setSigner() {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await provider.getSigner();



        this.contract = new ethers.Contract(marketPlace_address, marketPlace_abi, this.signer);
      } else {
        throw new Error("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Failed to set signer:", error);
      throw error;
    }
  }

  async registerListing(houseId, demandUnits, pricePerUnit, date) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.signer === null) {
          await this.setSigner();
        }
        const address = await this.signer.getAddress();

        this.contract.once(
          "NewAd", // Ensure event name matches the Solidity contract
          (id, consumer, houseAddress, demandUnits, arrangedUnits, eventDate, eventPricePerUnit, status) => {
            console.log(id, consumer, houseAddress, demandUnits, arrangedUnits, eventDate, eventPricePerUnit, status);
            debugger;
            alert("Event received!");

            // Save to MongoDB (or any backend)
            const statusEnum = ["Canceled", "Sold", "Live"];

            addAd({
              id: Number(id.toString()),
              consumer: address,
              houseAddress: Number(houseAddress),
              demandUnits: Number(demandUnits.toString()),
              date: eventDate,
              pricePerUnit: Number(eventPricePerUnit.toString()),
              status: statusEnum[Number(status)]
            });

            // Resolve the promise after the event is received and processed
            resolve({
              id: Number(id.toString()),
              houseAddress: houseAddress,
              demandUnits: Number(demandUnits.toString()),
              date: eventDate,
              pricePerUnit: Number(eventPricePerUnit.toString()),
              status: status
            });
          }
        );
        // Send the transaction to the contract
        const tx = await this.contract.addAd(houseId, demandUnits, pricePerUnit, date);
        await tx.wait(); // Wait for the transaction to be mined
        console.log("abc");
        console.log(tx);

      } catch (error) {
        console.error('Error:', error);
        reject(error); // Reject the promise in case of an error
      }
    });
  }

  async getListing() {
    return new Promise(async (resolve, reject) => {
      try {

        this.contract.once(
          "AddHouse",
          (id, houseAddress, powerUnits) => {
            console.log(id, houseAddress, powerUnits);
            resolve(
              {
                id: Number(id.toString()),
                houseAddress: houseAddress,
                powerUnits: Number(powerUnits.toString())
              });
          }
        );

        const tx = await this.contract.registerNewHouse(address);
        console.log('Transaction sent:', tx);

        await tx.wait();
        console.log('Transaction confirmed:', tx);
      }
      catch (exception) {
        console.log(exception);
      }
    })
  }

  async addHouse(address) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.signer === null) {
          await this.setSigner();
        }


        this.contract.once(
          "AddHouse",
          (id, houseAddress, powerUnits) => {
            console.log(id, houseAddress, powerUnits);
            resolve(
              {
                id: Number(id.toString()),
                houseAddress: houseAddress,
                powerUnits: Number(powerUnits.toString())
              });
          }
        );
        // Call the smart contract method
        const tx = await this.contract.registerNewHouse(address);
        console.log('Transaction sent:', tx);

        await tx.wait();
        console.log('Transaction confirmed:', tx);

        alert('House successfully added!');
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding house. Please try again.');
        reject(error);
      }
    });
  }
  async updatePowerUnits(houseId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.signer === null) {
          await this.setSigner();
        }

        // Call the smart contract method
        const tx = await this.contract.depositUnits(houseId, 100);
        console.log('Transaction sent:', tx);

        await tx.wait();
        console.log('Transaction confirmed:', tx);
        alert('Unit has been successully Updated');
        resolve(100);
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding house. Please try again.');
        reject(error);
      }
    });
  }

  async deleteHouse(houseId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.signer === null) {
          await this.setSigner();
        }

        // Call the smart contract method
        const tx = await this.contract.deleteHouse(houseId);
        console.log('Transaction sent:', tx);

        await tx.wait();
        console.log('Transaction confirmed:', tx);
        alert('House has been deleted successfully');
        resolve(true);
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting house. Please try again.');
        reject(error);
      }
    });
  }
  async getAdDetails(adId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.signer === null) {
          await this.setSigner();
        }

        const result = await getAdById(adId);
        if (result) {
          resolve(result);
          return;
        }
        reject("Ad is not present");

      } catch (error) {
        console.error('Error:', error);
        reject(error);
      }
    });
  }



  async placeOrder(adId,houseId,numberOfUnits, couponNum) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.signer === null) {
          await this.setSigner();
        }
        const address = await this.signer.getAddress();

        this.contract.once(
          "OrderPlaced", // Ensure event name matches the Solidity contract
          (orderId,_consumer,_producer,discountPercentage,numOfUnits,adId) => {
            console.log(orderId,_consumer,_producer,discountPercentage,numOfUnits,adId);

            addOrder({
              orderId:Number(orderId),
              _consumer:_consumer,
              houseId:houseId,
              _producer,
              discountPercentage:Number(discountPercentage),
              numOfUnits:Number(numOfUnits),
              adId:Number(adId)
            }
            );
            // Resolve the promise after the event is received and processed
            resolve({
              orderId,_consumer,_producer,houseId,discountPercentage,numOfUnits,adId
            });
          }
        );

        const tx = await this.contract.placeOrder(adId,houseId,numberOfUnits, couponNum);
        await tx.wait(); // Wait for the transaction to be mined
        
        resolve(true);
      } catch (error) {
        console.error('Error:', error);
        reject(error); // Reject the promise in case of an error
      }
    });
  }


  listenForUserDataUpdated() {
    debugger;
    if (this.contract) {
      this.contract.on('UserDataUpdated', (userAddress, loyaltyPoints, personalCoupons, houses) => {
        console.log(`User ${userAddress} updated with ${loyaltyPoints} loyalty points.`);
        console.log('Coupons:', personalCoupons);
        console.log('Houses:', houses);
      });
    } else {
      console.error('Contract not initialized');
    }
  }
}
