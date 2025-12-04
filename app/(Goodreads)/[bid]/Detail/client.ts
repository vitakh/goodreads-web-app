/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const REVIEW_API = `${HTTP_SERVER}/api/reviews`;
export const REQUEST_API= `${HTTP_SERVER}/api/requests`;

export const getAllReviews = async () => {
    console.log("Fetching all reviews");
    const response = await axios.get(`${REVIEW_API}`);
    return response.data;
};

export const createReview = async (reviewData: any) => {
    const response = await axiosWithCredentials.post(`${REVIEW_API}`, reviewData);
    return response.data;
};

export const getReviewsByBookId = async (bookId: string) => {
    console.log("Fetching reviews for book:", bookId);
    const response = await axios.get(`${HTTP_SERVER}/api/books/${bookId}/reviews`);
    return response.data;
}

export const deleteReview = async (reviewId: string) => {
    console.log("Deleting review:", reviewId);
    const response = await axiosWithCredentials.delete(`${REVIEW_API}/delete/${reviewId}`);
    return response.data;
}

export const updateReview = async (reviewId: string, updatedContent: string) => {
    console.log("Editing review:", reviewId);
    const response = await axiosWithCredentials.put(`${REVIEW_API}/update/${reviewId}`, { review: updatedContent });
    return response.data;
}

export const findRecentReviews = async () => {
    const response = await axios.get(`${REVIEW_API}/recent`);
    return response.data;
}

export const findRecentReviewUser = async (authorId: string) => {
    const response = await axios.get(`${REVIEW_API}/user/recent`, {params: {authorId}});
    return response.data;
}
export const getAllRequests = async () => {
    const response = await axios.get(`${REQUEST_API}`);
    return response.data;
};

export const createRequest = async (requestData: any) => {
    const response = await axiosWithCredentials.post(`${REQUEST_API}`, requestData);
    return response.data;
};
export const deleteRequest = async (requestId: string) => {
    const response = await axiosWithCredentials.delete(`${REQUEST_API}/delete/${requestId}`);
    return response.data;
}