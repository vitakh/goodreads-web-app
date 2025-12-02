/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Image } from "react-bootstrap";
import React from "react";
import Link from "next/link";
export default function BookshelfTable({ bookshelf }: { bookshelf: any[] }) {
    return (
        <table className="table table-striped table-bordered bookshelf-table">
            <thead className="table-light">
                <tr>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>Author(s)</th>
                    <th>Shelves</th>
                    <th>Notes</th>
                    <th>Date Added</th>
                    <th>Date Updated</th>
                    <th>Date Finished</th>
                </tr>
            </thead>
            <tbody>
                {bookshelf.map((item: any) => (
                    <tr key={item.bookId}>
                        <td>
                            <Image
                            src={item.book.thumbnail || "/noimage.png"}
                            alt={item.book.title || "No title"}
                            style={{ width: "60px", height: "90px", objectFit: "cover" }}/>
                        </td>
                        <td>
                            <Link href={`/${item.book._id}/Detail`} className="link">
                                {item.book.title}
                            </Link>
                        </td>
                        <td>{item.book.authors?.join(", ")}</td>
                        <td>{item.shelf}</td>
                        <td>{item.notes}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                        <td>{item.dateFinished ? new Date(item.dateFinished).toLocaleDateString() : "Not finished"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}