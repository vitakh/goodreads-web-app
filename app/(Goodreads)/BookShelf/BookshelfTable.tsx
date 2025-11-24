import React from "react";

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
                            <img
                                src={item.book.coverImageUrl}
                                alt={item.book.title}
                                style={{ width: "60px", height: "90px", objectFit: "cover" }}
                            />
                        </td>
                        <td>{item.book.title}</td>
                        <td>{item.book.authors?.join(", ")}</td>
                        <td>{item.shelf}</td>
                        <td>{item.book.notes}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                        <td>{item.dateFinished ? new Date(item.dateFinished).toLocaleDateString() : "Not finished"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}