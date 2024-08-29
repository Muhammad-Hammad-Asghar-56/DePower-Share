import {ADD_ORDER} from "./urls";
import axios from "axios";

// Function to add an ad
export const addOrder = async (body) => {
    try {
      console.log(body);
      debugger;
      const response = await axios.post(ADD_ORDER,body );
      return response.data;
    } catch (error) {
      console.error('Error adding ad:', error);
      throw error;
    }
  };
  