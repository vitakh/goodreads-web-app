"use client";
import * as client from "../client";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";

export default function Signin() {
    interface Credentials {
        username: string;
        password: string;
    }

    const [credentials, setCredentials] = useState<Credentials>({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();
    const signin = async () => {
        const user =  await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        redirect("/Account/Profile");
    };
    
    return (
        <div className={"center-box"}>
            <div className={"center-box-inner"}>
                <h1>Sign in</h1>
                <FormControl defaultValue={credentials.username}
                             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                             className="mb-2" placeholder="username" type="text"/>
                <FormControl defaultValue={credentials.password}
                             onChange={(e) =>setCredentials({ ...credentials, password: e.target.value })}
                             className="mb-2" placeholder="password" type="password" />
                <Button onClick={signin} className="w-100" > Sign in </Button>
                <Link href="/Account/Signup"> Not a member? Sign up! </Link>
            </div>
        </div>
    );
}