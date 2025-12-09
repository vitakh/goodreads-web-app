/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";

export default function BookshelfTable({ bookshelf }: { bookshelf: any[] }) {
    console.log("Bookshelf data:", bookshelf);
    return (
        <table className="table table-striped table-bordered bookshelf-table">
            <thead className="table-light">
                <tr>
                    <th>Title</th>
                    <th>Author(s)</th>
                    <th>Shelf</th>
                    <th>Date Added</th>
                </tr>
            </thead>
            <tbody>
                {bookshelf.map((item: any) => (
                    <tr key={item.book._id}>
                        <td>
                            <Link href={`/${item.book._id}/Detail`} className="link">
                                {item.book.title}
                            </Link>
                        </td>
                        <td>{item.book.authors?.join(", ")}</td>
                        <td>{item.shelf}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}