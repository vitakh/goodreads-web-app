"use client";
import { redirect } from "next/dist/client/components/navigation";
import * as client from "../client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import {Button, FormControl, FormLabel} from "react-bootstrap";
export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };
    const fetchProfile = () => {
        if (!currentUser) return redirect("/Account/Signin");
        setProfile(currentUser);
    };
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        redirect("/Account/Signin");
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <div className="wd-profile-screen">
            <h3>Profile</h3>
            {/*Profile to show if current user is looking at own profile*/}
            {profile && (
                <div>
                    <FormLabel> Username: </FormLabel>
                    <FormControl className="mb-2"
                                 defaultValue={profile.username}
                                 onChange={(e) => setProfile({ ...profile, username: e.target.value }) } />
                    <FormLabel> Password </FormLabel>
                    <FormControl className="mb-2"
                                 defaultValue={profile.password}
                                 onChange={(e) => setProfile({ ...profile, password: e.target.value }) } />
                    <FormLabel> First Name: </FormLabel>
                    <FormControl className="mb-2"
                                 defaultValue={profile.firstName}
                                 onChange={(e) => setProfile({ ...profile, firstName: e.target.value }) } />
                    <FormLabel> Last Name: </FormLabel>
                    <FormControl className="mb-2"
                                 defaultValue={profile.lastName}
                                 onChange={(e) => setProfile({ ...profile, lastName: e.target.value }) } />
                    <FormLabel> Date of Birth: </FormLabel>
                    <FormControl className="mb-2" type="date"
                                 defaultValue={profile.dob}
                                 onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
                    <FormLabel> Email: </FormLabel>
                    <FormControl className="mb-2"
                                 defaultValue={profile.email}
                                 onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    <FormLabel> Role: {profile.role}</FormLabel>
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
                    <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </Button>
                </div>
            )}
            {/*Profile to show for viewing another persons profile*/}
            {/*TODO*/}
        </div>
    );}