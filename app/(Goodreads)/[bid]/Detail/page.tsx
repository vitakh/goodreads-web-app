/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getBookshelf,
  addShelfEntry,
  getBookById,
  createBook,
  removeShelfEntry,
  getSingleBookById,
} from "../../BookShelf/client";
import { findAuthorById } from "../../Account/client";
import { Button, Form, FormControl, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  createReview,
  getReviewsByBookId,
  deleteReview,
  updateReview,
    createRequest,
} from "./client";
import "./styles.css";

export default function Detail() {
  const [status, setStatus] = useState("");
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const [shelfType, setShelfType] = useState("want");
  const [author, setAuthor] = useState<any[]>([]);
  const [isOnShelf, setIsOnShelf] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requested, setRequested] = useState(false);
  const [authorId, setAuthorId] = useState(true);

  const [book, setBook] = useState({
    id: "",
    volumeInfo: {
      title: "",
      authors: [],
      description: "",
      imageLinks: { thumbnail: "" },
      categories: [] as string[],
    },
  });
  const { bid } = useParams();
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState("");
  const [editReviewContent, setEditReviewContent] = useState("");
  const [editReviewId, setEditReviewId] = useState("");

  const fetchUserShelves = async () => {
    if (!currentUser) return;
    try {
      const shelvesWithBooks = await getBookshelf(currentUser._id);

      const existing = shelvesWithBooks.find(
        (entry: any) => entry.book?._id === bid
      );
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

  const fetchReviews = async () => {
    try {
      const data = await getReviewsByBookId(bid as string);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await fetchBook();
    await fetchUserShelves();
    await fetchReviews();
    setLoading(false);
  }

  const fetchAuthors = async () => {
      const user = await findAuthorById(bid as string);
      setAuthor(user);
      if (user.find((auth: any) => auth?._id === currentUser._id)) {
          setAuthorId(false);
      }
      console.log(user);
  }

  const handleAddToShelf = async () => {
    if (!currentUser || !book) {
      setStatus("Please sign in to add books.");
      return;
    }

    try {
      let dbBook = await getSingleBookById(bid as string);
      
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

      setIsOnShelf(true);
      setStatus(`Book added to '${shelfType}' shelf`);
    } catch (err) {
      console.error(err);
      setStatus("Error adding book to shelf.");
    }
  };

  const handleRemoveFromShelf = async () => {
    console.log("handleRemoveFromShelf called");
    console.log("bid:", bid);
    if (!currentUser) return;

    try {
      console.log("Calling removeShelfEntry...");
      const result = await removeShelfEntry(currentUser._id, bid as string);
      console.log("removeShelfEntry result:", result);
      setIsOnShelf(false);
      setStatus("Book removed from your shelf");
    } catch (err: any) {
      console.error("Error in removeShelfEntry:", err);
      setStatus("Error removing book from shelf.");
    }
  };

  const handlePostReview = async () => {
    if (!currentUser) {
      alert("Please sign in to post a review.");
      redirect("/Account/Signin");
    }

    if (newReview.trim().length === 0) {
      alert("Review cannot be empty.");
      return;
    }

    try {
      await createReview({
        review: newReview,
        title: book.volumeInfo.title,
        bookId: bid,
        authorId: currentUser._id,
      });

      setNewReview("");
      console.log("Review added.");
      await fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    await deleteReview(reviewId);
    await fetchReviews();
  };

  const handleEditReview = async (reviewId: string, updatedContent: string) => {
    await updateReview(reviewId, updatedContent);
    await fetchReviews();
  };

  const handlePostRequest = async () => {
        if (!currentUser) {
            alert("Please sign in to claim a book.");
            redirect("/Account/Signin");
        }

        try {
            await createRequest({
                userId: currentUser._id,
                bookId: bid,
                title: book.volumeInfo.title,
            });
            setRequested(true);
        } catch (err) {
            console.error(err);
        }
    };

  useEffect(() => {
    fetchData();
    fetchAuthors();
  }, [bid]);

  const info = book.volumeInfo;
  console.log("Book info:", info);
  console.log("Full book object:", book);
  const html = info.description;
  const text = html ? html.replace(/<[^>]*>/g, "").trim() : "No Description";

  if (loading) return <div>Loading...</div>;

  return (
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
                height={250}
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
                {author &&
                    author.map((auth : any)=> (
                        <div key={auth._id}>
                            <p>Registered Author Account:
                                <Link href={`/Account/Profile?userId=${auth?._id}`} className="link">
                                    <span>{auth?.firstName || "No first name"} {auth?.lastName || "No last name"}</span><br />
                                </Link>
                            </p>
                        </div>
                    ))
                }
              {isOnShelf ? (
                <button onClick={handleRemoveFromShelf}>
                  Remove from Shelf
                </button>
              ) : (
                <div>
                  <select
                    className="signup-select"
                    value={shelfType}
                    onChange={(e) => setShelfType(e.target.value as any)}
                  >
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
                {currentUser?.role == "AUTHOR" && authorId &&
                    <div>
                    {requested ? (
                            <button>
                                Author Claim Request Pending
                            </button>
                        ) : (
                            <div>
                                <button onClick={handlePostRequest}>
                                    Claim Book as Author
                                </button>
                            </div>
                        )}
                    </div>
                }
            </div>
          </div>
        </div>
      </div>
      <div className="center-box">
        <div className="center-box-inner">
          <h1>Reviews:</h1>
          {currentUser ? (
            <div>
              <Form.Group>
                <Form.Label htmlFor="review-input" className="review-input">
                  What did you think?
                </Form.Label>
                <Form.Control
                  id="review-input"
                  className="review-textarea"
                  type="text"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  as="textarea"
                  rows={3}
                  placeholder="Enter your review"
                />
              </Form.Group>
              <button className="btn-post-review" onClick={handlePostReview}>Post Review</button>
            </div>
          ) : (
            <div>
              <p>Please sign in to leave a review.</p>
            </div>
          )}
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review: any) => (
              <div key={review._id} className="review-entry">
                <div className="review-user-info"> 
                  <Link href={`/Account/Profile?userId=${review.author?._id}`} className="link">
                  <h4>{review.author?.username || "Unknown"}</h4>
                  </Link>
                <small className="text-muted">
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>
                </div>

                <div className="review-content">
                {editReviewId !== review._id ? (
                  <p>{review.review}</p>
                ) : (
                  <div>
                    <FormControl
                      as="textarea"
                      rows={3}
                      value={editReviewContent}
                      onChange={(e) => setEditReviewContent(e.target.value)}
                    />
                    <Button
                    className="btn-save-review"
                      onClick={async () => {
                        await handleEditReview(review._id, editReviewContent);
                        setEditReviewId("");
                      }}
                    >
                      Save
                    </Button>
                    <Button className="btn-cancel-review" onClick={() => setEditReviewId("")}>Cancel</Button>
                  </div>
                )}
                {currentUser &&
                  (currentUser._id === review.authorId || currentUser.role === "ADMIN") &&
                  editReviewId !== review._id && (
                    <div>
                      <Button
                        className="btn-edit-review"
                        onClick={() => {
                          setEditReviewId(review._id);
                          setEditReviewContent(review.review);
                        }}
                      >
                        Edit review
                      </Button>
                      <Button
                        className="btn-delete-review"
                        onClick={() => handleDeleteReview(review._id)}
                      >
                        Delete review
                      </Button>
                    </div>
                  )}
              </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
