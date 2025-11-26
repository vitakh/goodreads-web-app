/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import {
  Button,
  FormControl,
  ListGroup,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  const searchBooks = async () => {
    try {
      if (searchTerm.trim() === "") return;

      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_HTTP_SERVER
        }/api/books/search?query=${encodeURIComponent(searchTerm)}`
      );
      setResults(res.data.items || []);
    } catch (error) {
      console.log("Error searching books: ", error);
    }
  };

  return (
    <div className="center-box">
      <div className="center-box-inner">
        <h1>Search</h1>

        <div className="wd-search-bar">
          <FormControl
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search books"
            className="me-4"
            id="wd-search-input"
            value={searchTerm}
          />
          <Button
            onClick={() => {
              searchBooks();
            }}
            variant="primary"
            className="wd-search-btn"
          >
            Search
          </Button>
        </div>

        {results.length > 0 && (
          <ListGroup>
            {results.map((book: any) => {
              return (
                <ListGroupItem key={book.id} className="book-search-results">
                  <Image
                    src={
                      book.volumeInfo?.imageLinks?.thumbnail || "noimage.png"
                    }
                    alt={book.volumeInfo?.title || "No Title"}
                    width={100}
                    thumbnail
                  />
                    <Link href={`/${book.id}/Detail`} className="link">
                        {book.volumeInfo?.title || "No Title"}
                    </Link>
                  <p>
                    {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
                  </p>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </div>
    </div>
    // TODO: Display search bar that shows results for book title
    // TODO: Each Book title should be a link to the details page of that book
  );
}
