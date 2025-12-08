/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, FormControl, FormLabel } from "react-bootstrap";
import Link from "next/link";
export default function PrivateProfile({
    profile,
    setProfile,
    reviews,
    bookshelf,
    updateProfile,
    signout
}: any) {
    return (
        <div>
            {/* Personal Information Section */}
            <div className="profile-section">
                <h1 className="section-title">Personal Information</h1>
                <FormLabel> Username: </FormLabel>
                <FormControl className="mb-2"
                             defaultValue={profile.username}
                             onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                <FormLabel> Password </FormLabel>
                <FormControl className="mb-2"
                             defaultValue={profile.password}
                             onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                <FormLabel> First Name: </FormLabel>
                <FormControl className="mb-2"
                             defaultValue={profile.firstName}
                             onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                <FormLabel> Last Name: </FormLabel>
                <FormControl className="mb-2"
                             defaultValue={profile.lastName}
                             onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                <FormLabel> Date of Birth: </FormLabel>
                <FormControl className="mb-2" type="date"
                             value={profile.dob ? profile.dob.slice(0,10) : ""}
                             onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
                <FormLabel> Email: </FormLabel>
                <FormControl className="mb-2"
                             defaultValue={profile.email}
                             onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                <FormLabel> Role: {profile.role}</FormLabel>
                {profile?.role == "AUTHOR" &&
                    <FormLabel>
                        <p>Authored Books: </p>
                        <ul>
                            {profile.authBooks?.map((book : any) => (
                                <Link href={`/${book.bookId}/Detail`} className="link">
                                    <li key={book._id}>{book.title}</li>
                                </Link>
                            ))}
                        </ul>
                    </FormLabel>
                }
            </div>
            <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2 mt-3"> Update </Button>

            {/* Reviews Section */}
            <div className="profile-section mt-4">
                <h1 className="section-title">My Reviews ({reviews.length})</h1>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    <div>
                        {reviews.map((review: any) => (
                            <div key={review._id} className="profile-section mt-3">
                                <FormLabel>Book Name:</FormLabel>
                                <FormControl value={review.title} disabled className="mb-2" />
                                <FormLabel>Review:</FormLabel>
                                <FormControl as="textarea" rows={2} value={review.review} disabled />
                            </div>
                        ))}
                    </div>
                )}
                <Link href="/Home">
                    <Button variant="outline-primary" className="mt-3">View All</Button>
                </Link>
            </div>

            {/* Bookshelf Section */}
            <div className="profile-section mt-4">
                <h1 className="section-title">My Bookshelf ({bookshelf.length})</h1>
                {bookshelf.length === 0 ? (
                    <p>No books in your bookshelf yet.</p>
                ) : (
                    <div>
                        {bookshelf.map((entry: any) => (
                            <div key={entry._id} className="profile-section mt-3">
                                <FormLabel>Book Name:</FormLabel>
                                <FormControl value={entry.bookId?.title} disabled className="mb-2" />
                                <FormLabel>Shelf Type:</FormLabel>
                                <FormControl value={entry.shelf} disabled />
                            </div>
                        ))}
                    </div>
                )}
                <Link href="/BookShelf">
                    <Button variant="outline-primary" className="mt-3">View All</Button>
                </Link>
            </div>
            <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
                Sign out
            </Button>
        </div>
    );
}
