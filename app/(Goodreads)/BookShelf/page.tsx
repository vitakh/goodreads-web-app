/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "./styles.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBookshelf } from "./client";
import BookshelfTable from "./BookshelfTable";
import { FaBookBookmark } from "react-icons/fa6";

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
        return <div className="bookshelf-signin">Please sign in to view your bookshelf.</div>;
    }

    return (
        <div>
            <h1 className="bookshelf-header">
                <FaBookBookmark />
                {currentUser.username}&apos;s Bookshelf
            </h1>
            {bookshelf.length === 0 && <div>No books found.</div>}
            <BookshelfTable bookshelf={bookshelf} />
        </div>
    );
}

