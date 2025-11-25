"use client";
import "./styles.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBookshelf } from "./client";
import BookshelfTable from "./BookshelfTable";

export default function BookShelf() {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const [bookshelf, setBookshelf] = useState<any[]>([]);

    useEffect(() => {
        if (currentUser?._id) {
            getBookshelf(currentUser._id)
                .then(data => setBookshelf(data))
                .catch(err => console.error("Bookshelf API error:", err));
        }
    }, [currentUser]);

    if (!currentUser) {
        return <div>Please sign in to view your bookshelf.</div>;
    }

    return (
        <div>
            <h1 className="bookshelf-header">
                <span role="img" aria-label="bookshelf" style={{ fontSize: "2rem" }}>📚</span>
                {currentUser.username}'s Bookshelf
            </h1>
            {bookshelf.length === 0 && <div>No books found.</div>}
            <BookshelfTable bookshelf={bookshelf} />
        </div>
    );
}

