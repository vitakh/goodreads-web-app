/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormControl, FormLabel } from "react-bootstrap";

export default function PublicProfile({
    profile,
    reviews,
    bookshelf
}: any) {
    return (
        <div>
            {/* Public Information Section */}
            <div className="profile-section">
                <h1 className="section-title">User Information</h1>
                <FormLabel> Username: </FormLabel>
                <FormControl className="mb-2" value={profile.username} disabled />
                <FormLabel> First Name: </FormLabel>
                <FormControl className="mb-2" value={profile.firstName} disabled />
                <FormLabel> Last Name: </FormLabel>
                <FormControl className="mb-2" value={profile.lastName} disabled />
                <FormLabel> Role: </FormLabel>
                <FormControl className="mb-2" value={profile.role} disabled />
                <FormLabel> Last Activity: </FormLabel>
                <FormControl className="mb-2" value={profile.lastActivity || "N/A"} disabled />
            </div>

            {/* Reviews Section */}
            <div className="profile-section mt-4">
                <h1 className="section-title">Reviews ({reviews.length})</h1>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    <div>
                        {reviews.map((review: any) => (
                            <div key={review._id} className="profile-section mt-3">
                                <FormLabel>Book Name:</FormLabel>
                                <FormControl value={review.bookId?.title || "Book"} disabled className="mb-2" />
                                <FormLabel>Review:</FormLabel>
                                <FormControl as="textarea" rows={2} value={review.review} disabled />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bookshelf Section */}
            <div className="profile-section mt-4">
                <h1 className="section-title">Books ({bookshelf.length})</h1>
                {bookshelf.length === 0 ? (
                    <p>No books in bookshelf yet.</p>
                ) : (
                    <div>
                        {bookshelf.map((book: any) => (
                            <div key={book._id} className="profile-section mt-3">
                                <FormLabel>Book Name:</FormLabel>
                                <FormControl value={book.title || "Book"} disabled className="mb-2" />
                                <FormLabel>Shelf Type:</FormLabel>
                                <FormControl value={book.shelf} disabled />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
