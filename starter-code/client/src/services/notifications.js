import axios from "axios";

const apiNotificationService = axios.create({
  baseURL: "/api/notifications"
});

export const sellerBuyNotification = async (bookId, fullName, address) => {
  try {
    const response = await apiNotificationService.post(`/${bookId}`, {fullName, address});
    console.log(response);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};