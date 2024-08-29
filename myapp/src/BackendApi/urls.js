const BASE_URL = 'http://localhost:3000';



//                       users
export const REGISTER_USER = `${BASE_URL}/users/register`;
export const ADD_HOUSE = `${BASE_URL}/users/add-house`;
export const DEPOSIT_UNITS = `${BASE_URL}/users/deposit-units`;
export const GET_USER_BY_WALLET =(walletAddress)=>{
    return  `${BASE_URL}/users/user/${walletAddress}`
};

export const IS_HOUSE_PRESENT=(walletAddress)=>{
    return `${BASE_URL}/users/house/${walletAddress}/`;
}


//                      Ads
export const ADD_AD = `${BASE_URL}/ads/add`;
export const GET_ALL_ADS = `${BASE_URL}/ads/all`;

export const GET_AD_BY_ID=(adId)=>{
    return `${BASE_URL}/ads/${adId}`;
}
export const UPDATE_AD=(adId)=>{
    return `${BASE_URL}/ads/${adId}`;
}

export const DELETE_AD=(adId)=>{
    return `${BASE_URL}/ads/${adId}`;
}


//                      Orders
export const ADD_ORDER=`${BASE_URL}/orders/add`;