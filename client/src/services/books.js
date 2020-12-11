import axios from "axios";

const apiServiceBooks = axios.create({
  baseURL: "/api/book"
});

export const list = async () => {
  try {
    const response = await apiServiceBooks.get("/list");
    const books = response.data.books;
    return books;
  } catch (error) {
    throw error;
  }
};

export const load = async id => {
  try {
    const response = await apiServiceBooks.get(`/${id}`);
    const book = response.data.book;
    return book;
  } catch (error) {
    throw error;
  }
};

export const edit = async (id, book) => {
  try {
    await apiServiceBooks.patch(`/${id}`, book);
  } catch (error) {
    throw error;
  }
};

export const remove = async id => {
  try {
    await apiServiceBooks.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
};

export const create = async book => {
  const data = new FormData();
  data.append("title", book.title);
  data.append("author", book.author);
  data.append("isbn", book.isbn);
  data.append("synopsis", book.synopsis);
  data.append("type", book.type);
  data.append("seller", book.seller);
  for (let i = 0; i < book.genre.length; i++) {
    data.append("genre", book.genre[i]);
  }
  data.append("language", book.language);
  data.append("publishedYear", book.publishedYear);
  data.append("condition", book.condition);
  data.append("price", book.price);
  data.append("description", book.description);
  data.append("image", book.image);
  try {
    const response = await apiServiceBooks.post(`/create`, data);
    return response.data.book;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
