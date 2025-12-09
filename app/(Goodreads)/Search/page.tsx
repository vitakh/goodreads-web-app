/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  ListGroup,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchBooks = async (searchTerm: string, push: boolean) => {
    try {
      if (searchTerm.trim() === "") return;

      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_HTTP_SERVER
        }/api/books/search?query=${encodeURIComponent(searchTerm)}`
      );
      const resData = res.data.items || [];
      setResults(resData);
      // localStorage.setItem("searchTerm", searchTerm);
      // localStorage.setItem("searchResults", JSON.stringify(resData));
      if (push) router.push(`/Search?query=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.log("Error searching books: ", error);
    }
  };

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      setSearchTerm(query);
      searchBooks(query, false);
    } else {
      // const savedSearchTerm = localStorage.getItem("searchTerm");
      // const savedResults = localStorage.getItem("searchResults");
      //if (savedSearchTerm) {
      setSearchTerm("");
      //}
      setResults([]);
      //}
    }
  }, [searchParams]);



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
              searchBooks(searchTerm, true);
            }}
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
                    height={120}
                    width={100}
                    thumbnail
                  />
                  <div className="book-text-attributes">
                  <Link href={`/${book.id}/Detail`} className="link">
                        {book.volumeInfo?.title || "No Title"}
                    </Link>
                  <p>
                    by {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
                  </p>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </div>
    </div>
  );
}
