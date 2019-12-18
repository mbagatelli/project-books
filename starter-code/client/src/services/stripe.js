import axios from "axios";

export const stripe = async (token, product) => {
  try {
    const response = await axios.post("/api/checkout", { token, product });
    return response.data.status;
  } catch (error) {
    throw error;
  }
};
