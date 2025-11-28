"use client";
import "./styles.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import {findRecentReviews, getAllReviews, findRecentReviewUser} from "../[bid]/Detail/client";
import { useEffect, useState } from "react";
import {getBookById, findRecentShelf, findRecentShelfUser} from "../BookShelf/client";
export default function Home() {
    const [reviews, setReviews] = useState([]);
    const [shelf, setShelf] = useState([]);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const fetchReviews = async () => {
        if (!currentUser) {
            const data = await findRecentReviews();
            setReviews(data);
        }
        if (currentUser) {
            const data = await findRecentReviewUser(currentUser._id);
            setReviews(data);
        }
    };

    const fetchShelves = async () => {
        if (!currentUser) {
            const data = await findRecentShelf();
            setShelf(data);
        }
        if (currentUser) {
            const data = await findRecentShelfUser(currentUser._id);
            setShelf(data);
        }
    };

    useEffect(() => {
        fetchReviews();
        fetchShelves();
    }, []);
    return(
        <div>
            <div className="center-box">
                <div className="center-box-inner">
                    <h1>Home Page</h1>
                    <p>Welcome to Goodreads! This is the perfect place to track your books and leave reviews with
                    all of your thoughts. You can also view the reviews of other users to get an idea of how good a book
                        is before you read it. Track your shelves sorted by want to read, read, and reading. Search any book
                        using the search page! Make sure to sign in to enjoy personalized content. Enjoy!</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="box">
                        <h3>Your Recently Added Books</h3>
                        {!currentUser && <h4>Sign in to view your own recent books added!</h4>}
                        {shelf.length === 0 ? (<p>No books added yet.</p>) :
                            (shelf.map((book: any) => (

                                <div key={book._id} className="review-entry">
                                    <h4>User {book.userId?.username || "Unknown"} added "<Link href={`/${book.bookId?._id}/Detail`} className="link"> {book.bookId?.title}</Link>" to "{book.shelf}" shelf on {new Date(book.createdAt).toLocaleDateString()}: </h4>
                                </div>
                            )))}
                    </div>
                </div>
                <div className="col">
                    <div className="box">
                        <h3>Your Recent Reviews</h3>
                        {!currentUser && <h4>Sign in to view your own recent reviews!</h4>}
                        {reviews.length === 0 ? (<p>No reviews yet.</p>) :
                            (reviews.map((review: any) => (

                                <div key={review._id} className="review-entry">
                                    <h4>User {review.authorId?.username || "Unknown"} reviewed "<Link href={`/${review.bookId?._id}/Detail`} className="link"> {review.bookId?.title}</Link>" on {new Date(review.createdAt).toLocaleDateString()}: </h4>
                                    <p>{review.review}</p>
                                </div>
                                    )))}
                    </div>
                </div>
            </div>
        </div>
    );
}