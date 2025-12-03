"use client";
import * as client from "../../Account/client";
import { useState, useEffect } from "react";
import UserTable from "./Table";
export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const removeUser = async (userId: string) => {
        await client.deleteUser(userId);
        fetchUsers();
    }
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <UserTable users={users} fetchUsers={fetchUsers} removeUser={removeUser}/>
    );
}