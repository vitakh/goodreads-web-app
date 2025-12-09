/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import styles from "./styles.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import {findRecentReviews, findRecentReviewUser} from "../[bid]/Detail/client";
import { useEffect, useState } from "react";
import {findRecentShelf, findRecentShelfUser} from "../BookShelf/client";
import Footer from "../Footer";

// Helper components for cleaner code
const UserLink = ({ userId, username }: { userId: string; username: string }) => (
    <Link href={`/Account/Profile?userId=${userId}`} className="link">
        {username || "Unknown"}
    </Link>
);

const BookLink = ({ bookId, title }: { bookId: string; title: string }) => (
    <Link href={`/${bookId}/Detail`} className="link">
        {title}
    </Link>
);

const formatDate = (date: string) => new Date(date).toLocaleDateString();

export default function Home() {
    const [reviews, setReviews] = useState([]);
    const [shelf, setShelf] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    const fetchReviews = async () => {
        if (!currentUser) {
            const data = await findRecentReviews();
            setReviews(data);
        } else {
            const data = await findRecentReviewUser(currentUser._id);
            setReviews(data);
        }
    };

    const fetchShelves = async () => {
        if (!currentUser) {
            const data = await findRecentShelf();
            setShelf(data);
        } else {
            const data = await findRecentShelfUser(currentUser._id);
            setShelf(data);
        }
    };

    const fetchReviewAndShelf = async () => {
        setLoading(true);
        await fetchReviews();
        await fetchShelves();
        setLoading(false);
    }

    useEffect(() => {
        fetchReviewAndShelf();
    }, [currentUser]);

    if (loading) return <div>Loading...</div>;

    return(
        <div>
            <div className={styles.centerBox}>
                <div className={styles.centerBoxInner}>
                    <h1>Home Page</h1>
                    <p>Welcome to Goodreads! This is the perfect place to track your books and leave reviews with
                    all of your thoughts. You can also view the reviews of other users to get an idea of how good a book
                        is before you read it. Track your shelves sorted by want to read, read, and reading. Search any book
                        using the search page! Make sure to sign in to enjoy personalized content. Enjoy!</p>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.col}>
                    <div className={styles.box}>
                        <h3>Your Recently Added Books</h3>
                        {!currentUser && <h4>Sign in to view your own recent books added!</h4>}
                        {currentUser && shelf.length === 0 ? (<p>No books added yet.</p>) :
                            (shelf.map((book: any) => (
                                <div key={book._id} className={styles.reviewEntry}>
                                    <h4>
                                        User <UserLink userId={book.userId?._id} username={book.userId?.username} /> added 
                                        &quot;<BookLink bookId={book.bookId?._id} title={book.bookId?.title} />&quot;
                                        to &quot;{book.shelf}&quot; shelf on {formatDate(book.createdAt)}
                                    </h4>
                                </div>
                            )))}
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.box}>
                        <h3>Your Recent Reviews</h3>
                        {!currentUser && <h4>Sign in to view your own recent reviews!</h4>}
                        {reviews.length === 0 ? (<p>No reviews yet.</p>) :
                            (reviews.map((review: any) => (
                                <div key={review._id} className={styles.reviewEntry}>
                                    <h4>
                                        User <UserLink userId={review.authorId?._id} username={review.authorId?.username} /> reviewed 
                                        &quot;<BookLink bookId={review.bookId} title={review.title} />&quot;
                                        on {formatDate(review.createdAt)}
                                    </h4>
                                    <p>{review.review}</p>
                                </div>
                            )))}
                    </div>
                </div>
            </div>
         <Footer />
    </div>
    );
}