/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../BookShelf/styles.css";
import Link from "next/link";

export default function UserTable({ users = [], removeUser, currentUser }: { users?: any[]; removeUser: (userId: string) => void; currentUser: any}) {
    return(
        <table className="table table-striped table-bordered bookshelf-table">
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.filter((user) => user._id !== currentUser._id)
                .map((user) => (
                    <tr key={user._id}>
                        <td>{user.firstName || "No First Name"}</td>
                        <td>{user.lastName || "No Last Name"}</td>
                        <td>
                            <Link href={`/Account/Profile?userId=${user._id}`} className="link">
                                {user.username}
                            </Link>
                        </td>
                        <td>{user.role}</td>
                        <td>
                            <button className="btn btn-danger btn-sm"
                                    onClick={() => removeUser(user._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}