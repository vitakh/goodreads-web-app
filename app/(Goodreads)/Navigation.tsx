"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
export default function GoodreadsNavigation() {
    const pathname = usePathname();
    const links = [
        {label: "Home", path: "/Home"},
        {label: "My Books", path: "/Books"},
        {label: "Browse", path: "/Browse"},
        {label: "Profile", path: "/Profile"},
    ];
    return (
        <ListGroup>
            {links.map((link)=> (
                <ListGroupItem key={link.path} as={Link} href={link.path}>
                    {link.label}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}