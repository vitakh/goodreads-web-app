"use client";
import * as client from "../client";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";

export default function Signup() {
    interface User {
        username: string;
        password: string;
        role: string;
    }
    const [user, setUser] = useState<User>({
        username: "",
        password: "",
        role: "USER",
    });
    
    const dispatch = useDispatch();

    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        redirect("/Account/Profile");
    };

    return (
        <div className={"center-box"}>
            <div className={"center-box-inner"}>
                <h1>Sign up</h1>
                <FormControl defaultValue={user.username}
                             onChange={(e) => setUser({ ...user, username: e.target.value })}
                             className="mb-2" placeholder="User Name" type="text"/>
                <FormControl defaultValue={user.password}
                             onChange={(e) =>setUser({ ...user, password: e.target.value })}
                             className="mb-2" placeholder="Password" type="password" />
                <select className="signup-select"
                        value={user.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })} >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="AUTHOR">Author</option>
                </select>
                <Button onClick={signup} className="w-100" > Sign up </Button>
                <Link href="/Account/Signin"> Already a member? Sign in! </Link>
            </div>
        </div>
    );
}