import axios from "axios";

const googleBooksApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes"
});

export const listBooks = async query => {
  try {
    const response = await googleBooksApi.get("/", {
      params: {
        q: query,
        key: process.env.REACT_APP_GOOGLE_KEY
      }
    });
    // console.log(response.data);
    const listBooks = response.data;
    return listBooks;
  } catch (error) {
    throw error;
  }
};
