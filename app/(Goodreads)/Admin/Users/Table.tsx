import { FaUserCircle } from "react-icons/fa";
import "../../BookShelf/styles.css";
export default function UserTable({ users = [], fetchUsers, removeUser }: { users?: any[]; fetchUsers: () => void; removeUser: (userId: string) => void;}) {
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
            {users
                .map((user) => (
                    <tr key={user._id}>
                        <td>{user.firstName || "Not Inputted"}</td>
                        <td>{user.lastName || "Not Inputted"}</td>
                        <td>{user.username}</td>
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