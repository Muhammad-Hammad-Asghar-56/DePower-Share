import { ethers } from "ethers";
import { userRegistory_address, userRegistory_abi } from "./abi_index"; // Adjust path as needed
import { registerNewUser,getUser,addHouse,isHouseExist,updateHousePowerUnits } from "../BackendApi/Users";

export class UserRegistoryManager {
  constructor() {
    this.provider = new ethers.JsonRpcProvider('http://localhost:8545');
    this.signer = null;
    this.contract = null;
    
  }


  async setSigner() {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await provider.getSigner(); // Ensure you use 'await'
        this.contract = new ethers.Contract(userRegistory_address, userRegistory_abi, this.signer);
      } else {
        throw new Error("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Failed to set signer:", error);
      throw error;
    }
  }

  async registerUser() {
    return new Promise(async (resolve, reject) => {

      try {
        if (this.signer === null) {
          await this.setSigner();
        }
        const walletAddress = await this.signer.getAddress();
        
        const result=await getUser(walletAddress);
        if(result){
          console.log(result.data);
          resolve( result.data);
          return;
        }
        
        this.contract.once(
          "UserDataUpdated",
          (userAddress, loyaltyPoints, personalCoupons, houses) => {
            console.log({userAddress, loyaltyPoints, personalCoupons, houses})
            
            const couponseEnum = ["Coupon 2", "Coupon 5", "Coupon 10"];

            let formattedCoupons = [];
            for (let index = 0; index < personalCoupons.length; index++) {
              
              const element = personalCoupons[index];
              formattedCoupons.push(
                {  "name": couponseEnum[element[0]],
                  "disc": Number(element[1].toString()),
                  "numOfCoupons": Number(element[2].toString())
                }
              )
            }
            
            let formattedHouses=[];

            for(let i=0;i<houses.length;i++){
              debugger;
              const house=houses[i];
              formattedHouses.push({
                id:Number(house[0].toString()),
                houseAddress: house[1],
                powerUnits : Number(house[2].toString())
              })
            }

            registerNewUser( walletAddress,{
              walletAddress: userAddress,
              loyaltyPoints: Number(loyaltyPoints.toString()),
              personalCoupons: formattedCoupons,
              houses: formattedHouses
            });
            
            resolve(
              {
                walletAddress:userAddress, loyalityPoints:Number(loyaltyPoints.toString()), coupons:formattedCoupons, houses:formattedHouses
              });
          }
        );

        const tx = await this.contract.registerUser();
        await tx.wait(); // Wait for the transaction to be mined
        console.log(tx);
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    })
  }

  async addHouse(address){
    return new Promise(async (resolve, reject) => {
      try {
        if (this.signer === null) {
          await this.setSigner();
        }
  
        const walletAddress = await this.signer.getAddress();
        console.log('Wallet Address:', walletAddress);

        const result = await isHouseExist(walletAddress,address);
        if(result && result.data){
          reject("House is already present")
          return;
        }
        this.contract.once(
          "AddHouse",
          (id,houseAddress,powerUnits) => {
            console.log(id,houseAddress,powerUnits);
            
            addHouse(walletAddress,{
              id: Number(id.toString()),
              houseAddress: houseAddress,
              powerUnits: Number(powerUnits.toString())
            });
            
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
  async updatePowerUnits(houseId){
    return new Promise(async (resolve, reject) => {
      try {
        if (this.signer === null) {
          await this.setSigner();
        }
  
        // Call the smart contract method
        const tx = await this.contract.depositUnits(houseId,100);
        console.log('Transaction sent:', tx);
  
        await tx.wait();

        const walletAddress = await this.signer.getAddress();
        await updateHousePowerUnits(walletAddress,houseId,100);
        alert('Unit has been successully Updated');
        resolve(100);
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding house. Please try again.');
        reject(error);
      }
    });
  }


  async deleteHouse(houseId){
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
