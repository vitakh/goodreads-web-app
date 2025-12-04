/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
    console.log("Signing in with credentials:", credentials);
    const response = await  axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
    console.log("Signin response:", response.data);
    return response.data;
};
export const signup = async (user: any) => {
    console.log("Signing up user:", user);
    const response = await  axiosWithCredentials.post(`${USERS_API}/signup`, user);
    console.log("Signup response:", response.data);
    return response.data;
};
export const updateUser = async (user: any) => {
    console.log("Updating user:", user);
    const response = await  axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    console.log("Update response:", response.data);
    return response.data;
};
export const profile = async () => {
    console.log("Fetching profile");
    const response = await  axiosWithCredentials.post(`${USERS_API}/profile`);
    console.log("Profile response:", response.data);
    return response.data;
};
export const signout = async () => {
    console.log("Signing out");
    const response = await  axiosWithCredentials.post(`${USERS_API}/signout`);
    console.log("Signout response:", response.data);
    return response.data;
};
export const publicProfile = async (userId: string) => {
    console.log("Fetching public profile for:", userId);
    const response = await axiosWithCredentials.get(`${USERS_API}/profile/${userId}`);
    console.log("Public profile response:", response.data);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(`${USERS_API}`);
    return response.data;
};
export const deleteUser = async (userId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
    return response.data;
};
export const updateAuthBooks = async (userId: string, book: { bookId: string; title: string }) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${userId}/authBooks`, { book });
    return response.data;
};

export const findAuthorById = async (bookId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${bookId}/author`);
    return response.data;
};