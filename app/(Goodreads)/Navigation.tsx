"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import {RootState} from "./store";
export default function GoodreadsNavigation() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    
    const links = [
        {label: "Home", path: "/Home"},
        {label: "BookShelf", path: "/BookShelf"},
        {label: "Search", path: "/Search"},
        {label: "Profile", path: "/Account/Profile"},
    ];
    if (currentUser?.role === "ADMIN") {
        links.push({ label: "Users", path: "/Admin/Users" });
        links.push({ label: "Requests", path: "/Admin/Requests" });
    }
    return (
        <ListGroup className="navbar-container">
            {links.map((link)=> (
                <ListGroupItem key={link.path} className="navbar-item">
                    <Link href={link.path} className="navbar-link">
                        {link.label}
                    </Link>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}