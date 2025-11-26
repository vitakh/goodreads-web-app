"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addBookToShelf, getBookshelf, addShelfEntry, getBookById, createBook, removeShelfEntry, getSingleBookById } from "../../BookShelf/client";
import axios from "axios";
import {Image} from "react-bootstrap";
import { useSelector } from "react-redux";
export default function Detail() {
    // TODO: Check if book already exists before adding (avoid error for duplicate books)
    // TODO: Check if book already exists on shelf to maybe remove/disable button
    const [status, setStatus] = useState("");
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const [shelfType, setShelfType] = useState("want");
    const [isOnShelf, setIsOnShelf] = useState(false);
    const [book, setBook] = useState({
        id: "",
        volumeInfo: { title: "", authors: [], description: "", imageLinks: {thumbnail: ""}, categories: [] as string[] }
    });
    const {bid} = useParams();
    const fetchUserShelves = async () => {
        try {
            const shelvesWithBooks = await getBookshelf(currentUser._id);

            const existing = shelvesWithBooks.find((entry: any) => entry.book?._id === bid);
            if (existing) {
                setIsOnShelf(true);
                setShelfType(existing.shelf);
            }
        } catch (err) {
            console.error("Error fetching user shelves:", err);
        }
    };
    const fetchBook = async () => {
        try {
            const data = await getBookById(bid as string);
            setBook(data);
        } catch (err) {
            console.error("Error fetching book:", err);
        }
    };
    useEffect(() => {
        fetchBook();
        fetchUserShelves();
    }, [bid]);
    const handleAddToShelf = async () => {
        if (!currentUser || !book) {
            setStatus("Please sign in to add books.");
            return;
        }

        try {
            let dbBook = await getSingleBookById(bid as string);
            console.log("LOG", dbBook);
            if (!dbBook) {
                const bookData = {
                    _id: bid,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                };
                dbBook = await createBook(bookData);
            }
            await addShelfEntry({
                userId: currentUser._id,
                bookId: bid,
                shelf: shelfType,
            });

            setStatus(`Book added to '${shelfType}' shelf`);
        } catch (err) {
            console.error(err);
            setStatus("Error adding book to shelf.");
        }
    };

    const handleRemoveFromShelf = async () => {
        if (!currentUser) return;

        try {
            await removeShelfEntry(currentUser._id, bid as string);
            setIsOnShelf(false);
            setStatus("Book removed from your shelf");
        } catch (err) {
            console.error(err);
            setStatus("Error removing book from shelf.");
        }
    };


    const info = book.volumeInfo;
    const html = info.description;
    const text = html.replace(/<[^>]*>/g, "").trim();
    return(
        <div>
        <div className="center-box">
            <div className="center-box-inner">
                <h1>Book Details:</h1>
                <div className="book-details-row">
                    <div className="book-details-image mb-3">
                        <Image
                            src={info.imageLinks?.thumbnail || "/noimage.png"}
                            alt={info.title || "No Title"}
                            thumbnail
                            fluid
                        />
                    </div>

                    <div className="book-details-info">
                        <h2>{info.title}</h2>
                        <p className="text-muted">By: {info.authors?.join(", ")}</p>
                        <p>{text}</p>
                        {info.categories && info.categories.length > 0 && (
                            <p>
                                <strong>Genres:</strong> {info.categories.join(", ")}
                            </p>
                        )}
                        {isOnShelf ? (
                            <button onClick={handleRemoveFromShelf}>Remove from Shelf</button>
                        ) : (
                            <div>
                                <select className="signup-select" value={shelfType} onChange={(e) => setShelfType(e.target.value as any)}>
                                    <option value="" disabled>
                                        -- Select a Shelf Type --
                                    </option>
                                    <option value="want">Want</option>
                                    <option value="reading">Reading</option>
                                    <option value="read">Read</option>
                                </select>

                                <button onClick={handleAddToShelf}>Add to Shelf</button>
                            </div>
                        )}

                        {status && <p>{status}</p>}
                    </div>
                </div>
            </div>
        </div>
    <div className="center-box">
        <div className="center-box-inner">
            <h1>Reviews:</h1>
        </div>
    </div>
        </div>
    );
}
