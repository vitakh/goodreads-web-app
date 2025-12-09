/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as client from "../../[bid]/Detail/client";
import { updateAuthBooks } from "../../Account/client";
import { useState, useEffect } from "react";
import RequestsTable from "./Table";

export default function Requests() {
    const [requests, setRequests] = useState<any[]>([]);

    const fetchRequests = async () => {
        const requests = await client.getAllRequests();
        setRequests(requests);
    };
    
    const removeRequest = async (requestId: string) => {
        await client.deleteRequest(requestId);
        fetchRequests();
    }

    const updateBooks = async (userId: string, bookId: string, title: string) => {
        const book = {
            bookId: bookId,
            title: title,
        };
        await updateAuthBooks(userId, book);
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <RequestsTable requests={requests} removeRequest={removeRequest} updateBooks={updateBooks}/>
    );
}