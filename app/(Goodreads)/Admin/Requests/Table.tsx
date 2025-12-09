/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../BookShelf/styles.css";
import Link from "next/link";

export default function UserTable({ requests = [], removeRequest, updateBooks }: { requests?: any[]; removeRequest: (requestId: string) => void; updateBooks: (userId: string, bookId: string, title: string) => void;}) {
    return(
        <table className="table table-striped table-bordered bookshelf-table">
            <thead>
            <tr>
                <th>Username</th>
                <th>Book Title</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {requests
                .map((request) => (
                    <tr key={request._id}>
                        <td>
                            <Link href={`/Account/Profile?userId=${request.userId}`} className="link">
                                {request.userId.username}
                            </Link>
                        </td>
                        <td>
                            <Link href={`/${request.bookId}/Detail`} className="link">
                                {request.title}
                            </Link>
                        </td>
                        <td>
                            <button className="btn btn-danger btn-sm"
                                    onClick={() => {updateBooks(request.userId._id, request.bookId, request.title); removeRequest(request._id);}}>
                                Approve
                            </button>
                            <button className="btn btn-danger btn-sm"
                                    onClick={() => removeRequest(request._id)}>
                                Deny
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}