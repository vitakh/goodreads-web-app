/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const REVIEW_API = `${HTTP_SERVER}/api/reviews`;

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