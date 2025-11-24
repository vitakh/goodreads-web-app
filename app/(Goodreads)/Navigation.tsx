"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
export default function GoodreadsNavigation() {
    const pathname = usePathname();
    const links = [
        {label: "Home", path: "/Home"},
        {label: "BookShelf", path: "/BookShelf"},
        {label: "Search", path: "/Search"},
        {label: "Profile", path: "/Account/Profile"},
    ];
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