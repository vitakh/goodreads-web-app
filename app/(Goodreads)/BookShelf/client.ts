/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const BOOKSHELF_API = `${HTTP_SERVER}/api/bookshelf`;

export const getBookshelf = async (userId: string) => {
    console.log("Fetching bookshelf for user:", userId);
    const response = await axiosWithCredentials.get(`${BOOKSHELF_API}/user/${userId}`);
    console.log("Bookshelf response:", response.data);
    return response.data;
};

export const addBookToShelf = async (
    userId: string,
    bookId: string,
    shelf: string
) => {
    const response = await axios.post(BOOKSHELF_API, {
        userId,
        bookId,
        shelf,
        createdAt: new Date(),
        updatedAt: new Date(),
        dateFinished: null
    });
    return response.data;
};

export const getBookById = async (bookId: string) => {
    try {
        const res = await axios.get(`${HTTP_SERVER}/api/books/${bookId}`);
        return res.data;
    } catch (err: any) {
        if (err.response?.status === 404) {
            return null;
        }
        throw err;
    }
};

export const getSingleBookById = async (bookId: string) => {
    try {
        const res = await axios.get(`${HTTP_SERVER}/api/books/details/${bookId}`);
        return res.data;
    } catch (err: any) {
        if (err.response?.status === 404) {
            return null;
        }
        throw err;
    }
};

export const createBook = async (bookData: any) => {
    const res = await axios.post(`${HTTP_SERVER}/api/books`, bookData);
    return res.data;
};

export const addShelfEntry = async (shelfData: any) => {
    const res = await axios.post(BOOKSHELF_API, shelfData);
    return res.data;
};

export const removeShelfEntry = (userId: string, bookId: string) => {
    return axios.delete(BOOKSHELF_API, { data: { userId, bookId } });
};

export const findRecentShelf = async () => {
    const response = await axios.get(`${BOOKSHELF_API}/recent`);
    return response.data;
}

export const findRecentShelfUser = async (userId: string) => {
    const response = await axios.get(`${BOOKSHELF_API}/user/recent`, {params: {userId}});
    return response.data;
}