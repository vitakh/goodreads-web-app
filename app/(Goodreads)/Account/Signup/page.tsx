"use client";
import * as client from "../client";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";

export default function Signup() {
    interface Credentials {
        username: string;
        password: string;
    }
    const [credentials, setCredentials] = useState<Credentials>({
        username: "",
        password: ""
    });
    const dispatch = useDispatch();
    const signup = async () => {
        const currentUser = await client.signup(credentials);
        dispatch(setCurrentUser(currentUser));
        redirect("/Account/Profile");
    };
    return (
        <div className={"center-box"}>
            <div className={"center-box-inner"}>
                <h1>Sign up</h1>
                <FormControl defaultValue={credentials.username}
                             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                             className="mb-2" placeholder="username" type="text"/>
                <FormControl defaultValue={credentials.password}
                             onChange={(e) =>setCredentials({ ...credentials, password: e.target.value })}
                             className="mb-2" placeholder="password" type="password" />
                <Button onClick={signup} className="w-100" > Sign up </Button>
                <Link href="/Account/Signin"> Already a member? Sign in! </Link>
            </div>
        </div>
    );
}