/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect, useSearchParams } from "next/navigation";
import * as client from "../client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import {Button, FormControl, FormLabel} from "react-bootstrap";
export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    const fetchProfile = async () => {
        if (userId && (!currentUser || userId !== currentUser._id)) {
            try {
                const publicUser = await client.publicProfile(userId);
                setProfile(publicUser);
                setIsOwnProfile(false);
            } catch (err) {
                console.error("User not found:", err);
                redirect("/Home"); // or show error message
            }
        } else if (currentUser) {
            setProfile(currentUser);
            setIsOwnProfile(true);
        } else {
            redirect("/Account/Signin");
        }
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        redirect("/Account/Signin");
    };

    useEffect(() => {
        fetchProfile();
    }, [userId, currentUser]);

    return (
        <div className="wd-profile-screen">
            <h3>{isOwnProfile ? "My Profile" : `${profile.username}'s Profile`}</h3>
            {/* Private profile - own profile with edit access */}
            {isOwnProfile && profile && (
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
                    <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </Button>
                    <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </Button>
                </div>
            )}
            {/* Public profile - viewing another user's profile */}
            {!isOwnProfile && profile && (
                <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                    <p><strong>Last Activity:</strong> {profile.lastActivity}</p>
                </div>
            )}
        </div>
    );}