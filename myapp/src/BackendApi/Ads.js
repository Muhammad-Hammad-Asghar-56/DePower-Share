import axios from 'axios';
import { ADD_AD,GET_ALL_ADS,GET_AD_BY_ID,UPDATE_AD,DELETE_AD } from './urls';


// Function to add an ad
export const addAd = async (ad) => {
  try {
    console.log(ad);
    debugger;
    const response = await axios.post(ADD_AD, ad);
    return response.data;
  } catch (error) {
    console.error('Error adding ad:', error);
    throw error;
  }
};

// Function to get a single ad by ID
export const getAdById = async (adId) => {
  try {
    const response = await axios.get(GET_AD_BY_ID(adId));
    return response.data;
  } catch (error) {
    console.error('Error fetching ad:', error);
    throw error;
  }
};

// Function to get all ads
export const getAllAds = async () => {
  try {
      const response = await axios.get(GET_ALL_ADS);
    return response.data;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
};

// Function to update an ad by ID
export const updateAd = async (adId, updatedAd) => {
  try {
    const response = await axios.put(UPDATE_AD(adId), updatedAd);
    return response.data;
  } catch (error) {
    console.error('Error updating ad:', error);
    throw error;
  }
};

// Function to delete an ad by ID
export const deleteAd = async (adId) => {
  try {
    const response = await axios.delete(DELETE_AD(adId));
    return response.data;
  } catch (error) {
    console.error('Error deleting ad:', error);
    throw error;
  }
};



