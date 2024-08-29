import { REGISTER_USER, GET_USER_BY_WALLET, ADD_HOUSE, IS_HOUSE_PRESENT, DEPOSIT_UNITS } from "./urls";
import axios from "axios";

export const registerNewUser = async (walletAddress, body) => {
    try {
        const response = await axios.post(REGISTER_USER, {
            walletAddress: walletAddress,
            ...body
        });
        console.log('Registration successful:', response.data);
    } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
    }
};

export const getUser = async (walletAddress) => {
    try {
        const response = await axios.get(GET_USER_BY_WALLET(walletAddress));
        return response;
    } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
    }
};



export const addHouse = async (walletAddress, house) => {
    try {
        const response = await axios.post(ADD_HOUSE, { walletAddress: walletAddress, house: house })
        console.log('Registration successful:', response.data);
    } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
    }
}

export const updateHousePowerUnits = async (walletAddress, houseId, noOfUnits ) => {
    try {
        const response = await axios.post(DEPOSIT_UNITS, { walletAddress, houseId, noOfUnits })
        console.log('Registration successful:', response.data);
    } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
    }
}

export const isHouseExist = async (walletAddress, address) => {
    try {
        const response = await axios.post(IS_HOUSE_PRESENT(walletAddress), { houseAddress: address })
        return response;
    } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
    }
}