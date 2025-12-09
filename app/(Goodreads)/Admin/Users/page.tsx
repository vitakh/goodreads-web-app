/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as client from "../../Account/client";
import { useState, useEffect } from "react";
import UserTable from "./Table";
import { useSelector } from "react-redux";

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    
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
        <UserTable users={users} removeUser={removeUser} currentUser={currentUser}/>
    );
}