/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect, useSearchParams } from "next/navigation";
import * as client from "../client";
import * as reviewClient from "../../[bid]/Detail/client";
import * as bookshelfClient from "../../BookShelf/client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import PrivateProfile from "./PrivateProfile";
import PublicProfile from "./PublicProfile";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const [reviews, setReviews] = useState<any[]>([]);
    const [bookshelf, setBookshelf] = useState<any[]>([]);
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    
    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    const fetchProfile = async () => {
        setLoading(true);
        if (userId && (!currentUser || userId !== currentUser._id)) {
            try {
                const publicUser = await client.publicProfile(userId);
                setProfile(publicUser);
                setIsOwnProfile(false);
                // Fetch reviews for this user
                const userReviews = await reviewClient.findRecentReviewUser(userId);
                setReviews(userReviews);
                // Fetch bookshelf for this user
                const userBookshelf = await bookshelfClient.findRecentShelfUser(userId);
                setBookshelf(userBookshelf);
            } catch (err) {
                console.error("User not found:", err);
                redirect("/Home"); 
            }
        } else if (currentUser) {
            setProfile(currentUser);
            setIsOwnProfile(true);
            // Fetch reviews for current user
            const userReviews = await reviewClient.findRecentReviewUser(currentUser._id);
            setReviews(userReviews);
            // Fetch bookshelf for current user
            const userBookshelf = await bookshelfClient.findRecentShelfUser(currentUser._id);
            setBookshelf(userBookshelf);
        } else {
            redirect("/Account/Signin");
        }
        setLoading(false);
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        redirect("/Account/Signin");
    };

    useEffect(() => {
        fetchProfile();
    }, [userId, currentUser]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="wd-profile-screen">
            <h3>{isOwnProfile ? "My Profile" : `${profile.username}'s Profile`}</h3>
            
            {/* Private profile - own profile with edit access */}
            {isOwnProfile && profile && (
                <PrivateProfile
                    profile={profile}
                    setProfile={setProfile}
                    reviews={reviews}
                    bookshelf={bookshelf}
                    updateProfile={updateProfile}
                    signout={signout}
                />
            )}
            
            {/* Public profile - viewing another user's profile */}
            {!isOwnProfile && profile && (
                <PublicProfile
                    profile={profile}
                    reviews={reviews}
                    bookshelf={bookshelf}
                />
            )}
        </div>
    );
}