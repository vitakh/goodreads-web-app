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